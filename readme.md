# FleetRewards Feedback and Engagement System

To access the Feedback and Engagement System in FleetRewards (our part), it is available either by viewing the production environment hosted at https://fleetrewards-group5.up.railway.app/, or you can run the frontend and backends yourself (requires Internet connection to install and for backend to access database).

To run the code locally, you will need the following technologies installed:

- Python - Download Python
- pip - Download Python (bundled with Python in versions 3.4+ and 2.7.9+)
- Node.js - Node.js — Download Node.js®
- npm - Node.js — Download Node.js® (bundled with Node.js)

Then, run the following commands in your Command Prompt or terminal to install and start the system (note you may need to use aliases of these commands, e.g., python3 instead of python, or pip3 instead of pip:

1. Clone the project from GitHub

    `git clone https://github.com/ItsGoldeneyes/fleetrewards/`

1. Enter the cloned project folder

    `cd fleetrewards`

1. Switch to our branch

    `git checkout group-5`

1. Go into the backend folder

    `cd backend`

1. Create a virtual environment for Python called ".venv"

    `python -m venv .venv`

1. Activate the virtual environment you just created
    1. If you are on a Linux or MacOS system, use the following command

        `source .venv/bin/activate`

    1. If you are on a Windows system, use the following command instead

        `.venv\Scripts\activate`

1. Install the dependencies for the project backend

    `pip install -r requirements.txt`

1. If you encounter issues at this step run the following command instead

    `pip install flask flask-cors psycopg2-binary`

1. Start the backend

    `python main.py`

After you finish step 8, you should see a message similar to the following, indicating the backend is ready:

```bash
 * Serving Flask app "main" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 761-653-473
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Now, you can open a new terminal to start the frontend by going back into the fleetrewards directory:

1. Go into the frontend folder

    `cd frontend`

1. Install the required packages using npm

    `npm install`

1. Start the frontend

    `npm run dev`

After finishing step 11, you may see the following message indicating the frontend should be starting soon:

```bash
Starting the development server...

Once the frontend is ready, the following message will be displayed:
Compiled successfully!
You can now view create-react-app-starter in the browser.
  Local:            http://localhost:3000
  On Your Network:  http://###.###.###.###:3000
Note that the development build is not optimized.
To create a production build, use npm run build.
webpack compiled successfully
```

A new tab should have been opened in your default browser. If not, open a new tab and go to http://localhost:3000, where the frontend should now be working! The "On Your Network" address will change depending on the system this project is run on. 
