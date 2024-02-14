from flask import Flask
from flask_cors import CORS
from routes import set_up_routes

app = Flask(__name__)
CORS(app)

set_up_routes(app)

# initialize the database
from init_db import init_db

init_db()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
