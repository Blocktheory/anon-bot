import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

def create_mysql_connection():
    db_config = {
        'host': os.getenv("DATABASE_HOST"),
        'user': os.getenv("DATABASE_USER"),
        'password': os.getenv("DATABASE_PASSWORD"),
        'database': os.getenv("DATABASE_NAME"),
        'port': 8889
    }

    try:
        connection = mysql.connector.connect(**db_config)

        if connection.is_connected():
            print('Connected to MySQL server')
            return connection

    except mysql.connector.Error as e:
        print(f'Error: {e}')

def close_mysql_connection(connection):
    if connection.is_connected():
        connection.close()
        print('Connection closed')