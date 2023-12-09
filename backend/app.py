from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

from mysql_module import create_mysql_connection, close_mysql_connection

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)


# Save Proof
@app.route('/proof/accept', methods=['POST'])
def save_proof():
    connection = create_mysql_connection()
    cursor = connection.cursor()

    try:
        data = request.get_json()
        anon_data = data['anon_data']
        telegram_id = data['telegram_id']

        # Insert data into the database
        insert_query = 'UPDATE users SET anon_data=%s WHERE telegram_id=%s'
        cursor.execute(insert_query, (anon_data, telegram_id, ))
        connection.commit()

        return jsonify({'message': 'Proof saved successfully'})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

    finally:
        cursor.close()
        connection.close()


if __name__ == '__main__':
    app.run(debug=True)
    