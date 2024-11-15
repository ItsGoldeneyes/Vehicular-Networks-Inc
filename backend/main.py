from flask import Flask, request, jsonify
from flask_cors import CORS

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
        profile_status = 'normal'

        query = f"INSERT INTO public.profile (username, password, profile_status) VALUES ('{username}', '{password}', '{profile_status}') RETURNING user_id;"

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
    query = f"SELECT username, profile_status FROM public.profile WHERE username = '{body['username']}' AND password = '{body['password']}';"

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
                "username": data[0][0],
                "profile_status": data[0][1]
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


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
