from flask import Flask, request, jsonify
from flask_cors import CORS

import uuid
import psycopg2
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


# @app.route('/')
# def index():
#     return jsonify({"Choo Choo": "Welcome to your Flask app 🚅"})


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

@app.route('/create-form', methods=["POST"])
def create_form():
    """
    Request needs to be in the format:
    {
        "requested_by": "username",
        "form": {
            "name": "form name",
            "type": "feedback, survey, or poll",
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
        # Create form uuid
        id = uuid.uuid4()

        # Add form to form table
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(f"INSERT INTO public.form (id, name, type, created_by, created_at) VALUES ('{id}', '{body['form']['name']}', '{body['form']['type']}', '{body['requested_by']}', current_timestamp);")
        conn.commit()
        cur.close()

        # Add questions to form_question table
        for question in body['form']['questions']:
            cur = conn.cursor()
            cur.execute(f"INSERT INTO public.form_question (form_id, question_num, type, description, options) VALUES ('{id}', '{question['question_num']}', '{question['type']}', '{question['description']}', '{question['options'] if 'options' in question else ''}');")
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


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
