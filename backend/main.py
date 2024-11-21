from flask import Flask, request, jsonify
from flask_cors import CORS

import datetime
import psycopg2
import json
import time
import uuid
import os

app = Flask(__name__)
CORS(app)

if 'DATABASE_URL' in os.environ:
    DATABASE_URL = os.environ['DATABASE_URL']
else:
    DATABASE_URL = 'postgresql://postgres:WbVwEVfMeYzfzUGnrUKzmRfdHGRHjOHS@autorack.proxy.rlwy.net:31200/railway'


def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    # conn = psycopg2.connect(host='autorack.proxy.rlwy.net',
    #                         database='railway',
    #                         user=os.environ['DB_USERNAME'],
    #                         password=os.environ['DB_PASSWORD'])
    return conn


@app.route('/test-db')
def testdb():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.profile;')
    data = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(data)


@app.route('/register', methods=["POST"])
def register():
    """
    Takes a username, email, password, and password confirmation. If the passwords match, the user is registered.

    Request needs to be in the format:
    {
        "username": "username",
        "email": "email",
        "pass": "password",
        "pass-confirm": "password"
    }

    If request accepted, returns:
    {
        "status": 200,
        "user_id": "user_id",
        "username": "username",
        "profile_status": "normal"
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }

    """
    print("register")
    body = request.json

    if not body['pass'] == body['pass-confirm']:
        response = {
            "status": 400,
            "text": "Password is not matching"
        }
    else:
        # username, email, pass, pass-confirm
        username = body['username']
        password = body['pass']
        email = body['email']
        profile_status = 'normal'

        query = f"INSERT INTO public.profile (username, email, password, profile_status) VALUES ('{username}', '{email}', '{password}', '{profile_status}') RETURNING user_id;"

        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute(query)
            data = cur.fetchall()
            cur.close()
            conn.commit()
            conn.close()

            if data[0]:
                response = {
                    "status": 200,
                    "user_id": data[0][0],
                    "username": username,
                    "profile_status": profile_status
                }
            else:
                # Shouldn't enter here
                response = {
                    "status": 400,
                    "text": "Registration error: unknown"
                }
        except psycopg2.OperationalError as e:
            response = {
                "status": 400,
                "text": f"Error while using database: '{str(e).strip()}'"
            }
        except psycopg2.errors.UniqueViolation as e:
            response = {
                "status": 400,
                "text": f"Error: user already exists: '{str(e).strip()}'"
            }

    return jsonify(response)


@app.route('/login', methods=["POST"])
def login():
    """
    Takes a username and password, returns user_id if the username and password match.

    Request needs to be in the format:
    {
        "username": "username",
        "password": "password"
    }

    If request accepted, returns:
    {
        "status": 200,
        "user_id": "user_id",
        "username": "username",
        "profile_status": "normal"
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message
    }
    """

    print("login")
    body = request.json
    query = f"SELECT user_id, username, profile_status FROM public.profile WHERE username = '{body['username']}' AND password = '{body['password']}';"

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 1:
            response = {
                "status": 200,
                "user_id": data[0][0],
                "username": data[0][1],
                "profile_status": data[0][2]
            }
        else:
            response = {
                "status": 400,
                "text": "User not found"
            }
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }

    return jsonify(response)

@app.route('/lookup-user', methods=["POST"])
def lookup_user():
    """
    Takes an email, returns a user_id if the email is found in the database.

    Request needs to be in the format:
    {
        "email": "email"
    }

    If request accepted, returns:
    {
        "status": 200,
        "user_id": "user_id"
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }
    """

    body = request.json
    query = f"SELECT user_id FROM public.profile WHERE email = '{body['email']}';"

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 1:
            response = {
                "status": 200,
                "user_id": data[0][0]
            }
        else:
            response = {
                "status": 400,
                "text": "User not found"
            }
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }

    return jsonify(response)


@app.route('/create-form', methods=["POST"])
def create_form():
    """
    Request needs to be in the format:
    {
        "requested_by": "username",
        "form": {
            "name": "form name",
            "type": "feedback, survey, or poll",
            "points": "points",
            "questions": [
                {
                    "question_num": 1,
                    "type": "freeform, rate, or multiple_choice"
                    "description": "description of question 1, effectively the question itself"
                    "options": {["option1", "option2", "option3"]} (only for multiple_choice)
                },
                {
                    "question_num": 2,
                    "type": "freeform, rate, or multiple_choice"
                    "description": "description of question 2, effectively the question itself"
                    "options": {["option1", "option2", "option3"]} (only for multiple_choice)
                }
            ]
        }
    }

    If request accepted, returns:
    {
        "status": 200,
        "form_id": "form_id"
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }

    Form added to database with format:
        TABLE form
        "id": "form_id",
        "name": "form name",
        "type": "feedback, survey, or poll",
        "created_by": "username",
        "created_at": "timestamp",

        TABLE form_question
        "form_id": "form_id",
        "question_num": "1",
        "type": "freeform, rate, or multiple_choice"
        "description": "description of question 1, effectively the question itself"
        "options": {["option1", "option2", "option3"]} (only for multiple_choice)
    """

    print("create-form")
    body = request.json

    # Check for form name
    if not 'name' in body['form']:
        response = {
            "status": 400,
            "text": "Form name not provided"
        }
        return jsonify(response)

    # Check for type of form
    if not 'type' in body['form']:
        response = {
            "status": 400,
            "text": "Form type not provided"
        }
        return jsonify(response)

    # Check for points
    if not 'points' in body['form']:
        response = {
            "status": 400,
            "text": "Form points not provided"
        }
        return jsonify(response)

    # Check for questions
    if not 'questions' in body['form']:
        response = {
            "status": 400,
            "text": "Form questions not provided"
        }
        return jsonify(response)

    # Check for question type, description, and options
    for question in body['form']['questions']:
        if not 'type' in question:
            response = {
                "status": 400,
                "text": "Question type not provided"
            }
            return jsonify(response)

        if not 'description' in question:
            response = {
                "status": 400,
                "text": "Question description not provided"
            }
            return jsonify(response)

        if question['type'] == "multiple_choice" and not 'options' in question:
            response = {
                "status": 400,
                "text": "Question options not provided"
            }
            return jsonify(response)

    # Add form to database
    try:
        print(f"INSERT INTO public.form (name, type, created_by, points) VALUES ('{body['form']['name']}', '{body['form']['type']}', '{body['requested_by']}', {body['form']['points']});")

        # Add form to form table
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(f"INSERT INTO public.form (name, type, created_by, points) VALUES ('{body['form']['name']}', '{body['form']['type']}', '{body['requested_by']}', {body['form']['points']});")
        # Pull form id
        cur.execute(f"SELECT id FROM public.form WHERE name = '{body['form']['name']}' AND created_by = '{body['requested_by']}' ORDER BY created_at DESC LIMIT 1 ;")
        form_id = cur.fetchall()
        id = form_id[0][0]
        cur.close()

        for question in body['form']['questions']:
            cur = conn.cursor()
            # Serialize options to JSON if present, else set to None
            options = json.dumps(question['options']) if 'options' in question else None
            cur.execute(
                """
                INSERT INTO public.form_question (form_id, question_num, type, description, options)
                VALUES (%s, %s, %s, %s, %s);
                """,
                (id, question['question_num'], question['type'], question['description'], options)
            )
        conn.commit()
        cur.close()

        conn.close()

        response = {
            "status": 200,
            "form_id": id
        }
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }

    return jsonify(response)


@app.route('/get-forms', methods=["POST"])
def get_forms():
    """
    Request needs to be in the format:
    {
        "requested_by": "username"
    }

    If request accepted, returns:
    {
        "status": 200,
        "forms": [
            {
                "form_id": "form_id",
                "name": "form name",
                "type": "feedback, survey, or poll",
                "created_by": "username",
                "created_at": "timestamp",
                "points": "points"
            },
            ...
        ]
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }
    """
    print("get-forms")
    body = request.json

    # If userid not in users table, return error
    query = f"SELECT user_id FROM public.profile WHERE user_id = '{body['requested_by']}';"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 0:
            response = {
                "status": 400,
                "text": "User not found"
            }
            return jsonify(response)
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }
        return jsonify(response)

    # Get forms from database that user has not responded to
    query = f"""
    SELECT form.id, form.name, form.type, form.created_by, form.created_at, form.points
    FROM public.form
    WHERE form.id NOT IN (
        SELECT form_id
        FROM public.form_response
        WHERE user_id = '{body['requested_by']}'
    );
    """

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        forms = []
        for form in data:
            forms.append({
                "form_id": form[0],
                "name": form[1],
                "type": form[2],
                "created_by": form[3],
                "created_at": form[4],
                "points": form[5]
            })

        response = {
            "status": 200,
            "forms": forms
        }

    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }

    return jsonify(response)


@app.route('/get-form', methods=["POST"])
def get_form():
    """
    Request needs to be in the format:
    {
        "requested_by": "user_id",
        "form_id": "form_id"
    }

    If request accepted, returns:
    {
        "status": 200,
        "form": {
            "name": "form name",
            "type": "feedback, survey, or poll",
            "created_by": "username",
            "created_at": "timestamp",
            "points": "points",
            "questions": [
                {
                    "question_num": 1,
                    "type": "freeform, rate, or multiple_choice"
                    "description": "description of question 1, effectively the question itself"
                    "options": {["option1", "option2", "option3"]} (only for multiple_choice)
                },
                ...
            ]
        }
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }
    """
    print("get-form")
    body = request.json

    # Check if user_id is in users table
    query = f"SELECT user_id FROM public.profile WHERE user_id = '{body['requested_by']}';"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 0:
            response = {
                "status": 400,
                "text": "User not found"
            }
            return jsonify(response)
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }
        return jsonify(response)

    # Check for form_id
    if not 'form_id' in body:
        response = {
            "status": 400,
            "text": "Form ID not provided"
        }
        return jsonify(response)

    # Get form from database
    query = f"SELECT name, type, created_by, created_at, points FROM public.form WHERE id = '{body['form_id']}';"

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 0:
            response = {
                "status": 400,
                "text": "Form not found"
            }
            return jsonify(response)

        form = {
            "name": data[0][0],
            "type": data[0][1],
            "created_by": data[0][2],
            "created_at": data[0][3],
            "points": data[0][4]
        }

        query = f"SELECT question_num, type, description, options FROM public.form_question WHERE form_id = '{body['form_id']}';"

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        questions = []
        for question in data:
            questions.append({
                "question_num": question[0],
                "type": question[1],
                "description": question[2],
                "options": question[3]
            })

        form['questions'] = questions

        response = {
            "status": 200,
            "form": form
        }

    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }

    return jsonify(response)


@app.route('/submit-form', methods=["POST"])
def submit_form():
    """
    Request needs to be in the format:
    {
        "requested_by": user_id,
        "form": {
            "form_id": uuid,
            "responses": [
                {
                    "question_num": 1,
                    "type": "freeform, rate, or multiple_choice"
                    "answer": "text iff freeform or multiple_choice, int if rate (1 to 5, inclusive)"
                },
                {
                    "question_num": 2,
                    "type": "freeform, rate, or multiple_choice"
                    "answer": "text iff freeform or multiple_choice, int if rate (1 to 5, inclusive)"
                }
            ]
        }
    }

    If request accepted, returns:
    {
        "status": 200,
        "answers_submitted": "int"
    }

    If request rejected, returns:
    {
        "status": 400,
        "text": "Error message"
    }

    Form added to database with format:
        TABLE form_response
        "id": "form_id",
        "question_num": intQuestionNum,
        "form_id": "form_id",
        "user_id": "requested_by",
        "freeform_answer": "text", (only for 'freeform' questions)
        "rate_answer": intOption, (only for 'rate' questions)
        "mc_answer": intOption (only for 'multiple_choice' questions)
    """
    print("submit-form")
    body = request.json

    if not 'requested_by' in body:
        response = {
            "status": 400,
            "text": "No user provided."
        }
        return jsonify(response)

    # Check if user_id is in users table
    query = f"SELECT user_id FROM public.profile WHERE user_id = '{body['requested_by']}';"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 0:
            response = {
                "status": 400,
                "text": "User not found"
            }
            return jsonify(response)
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }
        return jsonify(response)

    if not 'form' in body:
        response = {
            "status": 400,
            "text": "No form provided."
        }
        return jsonify(response)

    if not 'form_id' in body['form']:
        response = {
            "status": 400,
            "text": "No form id provided."
        }
        return jsonify(response)

    # Check if form_id is in forms table
    query = f"SELECT id FROM public.form WHERE id = '{body['form']['form_id']}';"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cur.close()
        conn.close()

        if len(data) == 0:
            response = {
                "status": 400,
                "text": "Form not found"
            }
            return jsonify(response)
    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }
        return jsonify(response)

    if not 'responses' in body['form']:
        response = {
            "status": 400,
            "text": "Responses not provided."
        }
        return jsonify(response)

    for answer in body['form']['responses']:
        if not 'question_num' in answer:
            response = {
                "status": 400,
                "text": "Question number of answer not provided"
            }
            return jsonify(response)
        # TODO check question_num matches form_question in DB?

        if not 'type' in answer:
            response = {
                "status": 400,
                "text": "Answer type not provided"
            }
            return jsonify(response)
        # TODO check type matches form_question.type in DB?

        if answer['type'] not in ['freeform', 'rate', 'multiple_choice']:
            response = {
                "status": 400,
                "text": "Invalid answer type received"
            }
            return jsonify(response)

        if answer['type'] in ['rate'] and not str(answer['type']).isdigit():
            response = {
                "status": 400,
                "text": "Answer for rate is not a non-negative integer"
            }

        if not 'answer' in answer:
            response = {
                "status": 400,
                "text": "No answer provided for some question"
            }
            return jsonify(response)

    try:
        answer_data = []
        conn = get_db_connection()
        cur = conn.cursor()

        for answer in body['form']['responses']:
            if answer['type'] == 'freeform':
                # Remove ' from answer to prevent errors
                answer['answer'] = answer['answer'].replace("'", "")
                query = f"INSERT INTO form_response (question_num, form_id, user_id, freeform_answer) VALUES ('{answer['question_num']}', '{body['form']['form_id']}', '{body['requested_by']}', '{answer['answer']}') RETURNING id;"
            elif answer['type'] == 'rate':
                query = f"INSERT INTO form_response (question_num, form_id, user_id, rate_answer) VALUES ('{answer['question_num']}', '{body['form']['form_id']}', '{body['requested_by']}', {answer['answer']}) RETURNING id;"
            elif answer['type'] == 'multiple_choice':
                query = f"INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES ('{answer['question_num']}', '{body['form']['form_id']}', '{body['requested_by']}', '{answer['answer']}') RETURNING id;"

            cur.execute(query)

            data = cur.fetchall()
            answer_data.append(data)
        cur.close()
        conn.commit()
        conn.close()

        # Ensure that all answers were submitted and have an associated id
        if len(answer_data) == len(body['form']['responses']):
            response = {
                "status": 200,
                "answers_submitted": len(answer_data)
            }
        else:
            # Shouldn't enter here
            response = {
                "status": 400,
                "text": "Answer submission error: unknown"
            }

    except psycopg2.OperationalError as e:
        response = {
            "status": 400,
            "text": f"Error while using database: '{str(e).strip()}'"
        }
        return jsonify(response)

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
