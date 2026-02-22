import pymysql
from dotenv import load_dotenv
import os

import pymysql.cursors

load_dotenv()

DB_HOST = os.environ["DB_HOST"]
DB_PORT = int(os.environ["DB_PORT"])
DB_USER = os.environ["DB_USER"]
DB_PASSWORD = os.environ["DB_PASSWORD"]

new_database_name = "pizza_express"

connection = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    port=DB_PORT,
    password=DB_PASSWORD,
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)


try:
    with connection.cursor() as cursor:
        # Comando para criar o banco de dados
        sql = f"CREATE DATABASE {new_database_name}"
        cursor.execute(sql)
        print(f"Banco de dados '{new_database_name}' criado com sucesso.")
        
        # Listar todos os bancos para verificar
        cursor.execute("SHOW DATABASES")
        databases = cursor.fetchall()
        for db in databases:
            print(db['Database'])
            
except Exception as e:
    print(f"Erro ao criar banco de dados: {e}")
finally:
    connection.close()