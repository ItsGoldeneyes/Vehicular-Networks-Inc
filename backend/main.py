from flask import Flask, jsonify
import psycopg2
import os

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect('postgresql://postgres:WbVwEVfMeYzfzUGnrUKzmRfdHGRHjOHS@autorack.proxy.rlwy.net:31200/railway')
    # conn = psycopg2.connect(host='autorack.proxy.rlwy.net',
    #                         database='railway',
    #                         user=os.environ['DB_USERNAME'],
    #                         password=os.environ['DB_PASSWORD'])
    return conn


@app.route('/')
def index():
    response = jsonify({"Choo Choo": "Welcome to your Flask app 🚅"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/test-db')
def testdb():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.profile;')
    data = cur.fetchall()
    cur.close()
    conn.close()

    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
