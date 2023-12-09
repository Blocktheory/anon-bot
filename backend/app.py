from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

from mysql_module import create_mysql_connection, close_mysql_connection

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)


if __name__ == '__main__':
    app.run(debug=True)
    