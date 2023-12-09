import mysql

from mysql_module import create_mysql_connection, close_mysql_connection

def create_table(connection):
    try:
        cursor = connection.cursor()

        # Define the table creation query
        create_table_query = '''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                telegram_id VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE,
                anon_data TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                location TEXT NULL,
                start_date DATE,
                end_date DATE,
                organizer VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS event_registrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_id INT,
                user_id INT,
                check_in_status BOOL,
                check_id_time DATETIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (event_id) REFERENCES events(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            
        '''

        # Execute the query
        cursor.execute(create_table_query)
        print('Tables created successfully')

        # Commit the changes
        connection.commit()

    except mysql.connector.Error as e:
        print(f'Error: {e}')

    finally:
        cursor.close()
        
def insert_events(connection):
    try:
        cursor = connection.cursor()

        # Execute the query
        cursor.execute("INSERT INTO events (name, location, start_date, end_date, organizer) VALUES(%s, %s, %s, %s, %s)", ("ETHIndia 2023", "Bengaluru", "2023-12-08", "2023-12-10", "ETHGlobal"))
        cursor.execute("INSERT INTO events (name, location, start_date, end_date, organizer) VALUES(%s, %s, %s, %s, %s)", ("Pragma Denver", "Denver", "2024-02-28", "2024-02-28", "ETHGlobal"))
        cursor.execute("INSERT INTO events (name, location, start_date, end_date, organizer) VALUES(%s, %s, %s, %s, %s)", ("Pragma London", "London", "2024-03-14", "2024-03-14", "ETHGlobal"))
        print('Tables created successfully')

        # Commit the changes
        connection.commit()

    except mysql.connector.Error as e:
        print(f'Error: {e}')

    finally:
        cursor.close()

if __name__ == "__main__":
    connection = create_mysql_connection()
    create_table(connection)
    # connection2 = create_mysql_connection()
    # insert_events(connection2)
    close_mysql_connection(connection)

