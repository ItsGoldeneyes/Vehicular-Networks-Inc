import requests
import json
import uuid
import unittest
BACKEND_URL = "https://backend-group5.up.railway.app/"

endpoints = ['register',
             'login',
             'lookup-user',
             'create-form',
             'get-forms',
             'get-form',
             'submit-form',
             'get-form-response',
             'get-user-responses',
             'get-user-points',
             'create-training-session',
             'log-training-session',
             'report-training-attendance',
             ]

class TestBackend(unittest.TestCase):
    def test_register(self):
        url = BACKEND_URL + 'register'
        data = {
            "username": "testuser",
            "pass": "testpassword",
            "pass-confirm": "testpassword",
            "email": "thisisanemail.com",
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_login(self):
        url = BACKEND_URL + 'login'
        data = {
            "username": "testuser",
            "password": "testpassword",
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_lookup_user(self):
        url = BACKEND_URL + 'lookup-user'
        email = 'thisisanemail.com'
        data = {
            "email": email
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_create_form(self):
        url = BACKEND_URL + 'create-form'
        data = {
            "requested_by": str(uuid.uuid4()),
            "form": {
                "name": "This is a very real form",
                "type": "feedback",
                "points": 5000,
                "questions": [
                    {
                        "question_num": 1,
                        "type": "freeform",
                        "description": "What do you think of our service?"
                    },
                    {
                        "question_num": 2,
                        "type": "multiple_choice",
                        "description": "How would you rate our service?",
                        "options": ["1", "2", "3", "4", "5"]
                    }
                ]
            }
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_get_forms(self):
        url = BACKEND_URL + 'get-forms'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_get_form(self, form_id='08bc4241-d61b-4547-9b58-eb71c79d94c8'):
        url = BACKEND_URL + 'get-form'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id,
            "form_id": form_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_submit_form(self, form_id='08bc4241-d61b-4547-9b58-eb71c79d94c8'):
        url = BACKEND_URL + 'submit-form'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id,
            "form": {
                "form_id": form_id,
                "responses": [
                    {
                        "question_num": 1,
                        'type': 'freeform',
                        "answer": "I think it's great!"
                    },
                    {
                        "question_num": 2,
                        'type': 'multiple_choice',
                        "answer": "5"
                    }
                ]
            }
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_get_form_responses(self, form_id='08bc4241-d61b-4547-9b58-eb71c79d94c8'):
        url = BACKEND_URL + 'get-form-responses'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id,
            "form_id": form_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_get_user_responses(self):
        url = BACKEND_URL + 'get-user-responses'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_get_user_points(self):
        url = BACKEND_URL + 'get-user-points'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_create_training_session(self):
        url = BACKEND_URL + 'create-training-session'
        data = {
            "requested_by": str(uuid.uuid4()),
            "session": {
                "title": "This is a very real training session!!!!",
                "description": "This is a very real training session!!!!",
                "points": 5000,
            }
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_log_training_session(self, training_id='08bc4241-d61b-4547-9b58-eb71c79d94c8'):
        url = BACKEND_URL + 'log-training-session'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id,
            "training_id": training_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_report_training_attendance(self, training_id='08bc4241-d61b-4547-9b58-eb71c79d94c8'):
        url = BACKEND_URL + 'report-training-attendance'
        user_id = 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2'
        data = {
            "requested_by": user_id,
            "training_id": training_id
        }
        response = requests.post(url, json=data)
        self.assertEqual(response.status_code, 200)
        print(response.json())
        return response.json()

    def test_all_endpoints(self):
        for endpoint in endpoints:
            print(f"Testing {endpoint}")
            endpoint.replace("-", "_")
            getattr(self, f"test_{endpoint.replace}")()

if __name__ == '__main__':
    unittest.main()

