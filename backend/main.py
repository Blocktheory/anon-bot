import logging
import os
import mysql
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, ContextTypes, Updater, CommandHandler, CallbackQueryHandler, MessageHandler, CallbackContext
from mysql_module import create_mysql_connection, close_mysql_connection

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

def create_user(connection, telegram_id):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE telegram_id = %s", (telegram_id,))
    existing_user = cursor.fetchone()
    if not existing_user:
        cursor.execute("INSERT INTO users (telegram_id) VALUES(%s)", (telegram_id,))
        connection.commit()
    cursor.close()
    # connection.close()
    
def fetch_events(connection):
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT GROUP_CONCAT(name) FROM events")
        results = cursor.fetchall()
        events = []
        for result in results:
            events.append(result[0])
        # events = [result[0] for result in results] if results else []
        return ", ".join(events)
    except mysql.connector.Error as e:
        print(f'Error: {e}')
    finally:
        cursor.close()


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Hi, Welcome to Anon Bot")
    connection = create_mysql_connection()
    create_user(connection, update.effective_user.id)
    

async def events(update: Update, context: ContextTypes.DEFAULT_TYPE):
    options = fetch_events(connection).split(",")
    keyboard = [[InlineKeyboardButton(name, callback_data=name)] for name in options]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Choose an event:')

async def registered(update: Update, context:ContextTypes.DEFAULT_TYPE ):
    connection = create_mysql_connection()
    options = fetch_events(connection).split(",")
    keyboard = [[InlineKeyboardButton(name, callback_data=name)] for name in options]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Check in to an event :', reply_markup=reply_markup)
    

if __name__ == '__main__':
    
    application = ApplicationBuilder().token(os.getenv("TELEGRAM_BOT_TOKEN")).build()
    
    start_handler = CommandHandler('start', start)
    # application.add_handler(start_handler)
    
    events_handler = CommandHandler('events', events);
    register_handler = CommandHandler('registered', events);
    application.add_handlers([start_handler, events_handler, register_handler])
    
    application.run_polling()
