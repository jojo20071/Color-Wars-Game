from flask import Flask, send_file, jsonify,render_template
from flask import request
import json
import os
from supabase import create_client, Client

passupa ="kjJE4iCgzD1XJGfs"

url: str = "https://dugzfjsamotjbsomllxn.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Z3pmanNhbW90amJzb21sbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NzEzODEsImV4cCI6MjAzNjQ0NzM4MX0.ivTb2uot09cjSYhXObJcD4g2S6QTw8ZduMBdlsFD14s"
supabase: Client = create_client(url, key)

app = Flask(__name__)

DATA_FILE = 'data.json'

default_json = {"c":"r","f1": 0, "f2": 0, "f3": 0, "f4": 0, "f5": 0, "f6": 0, "f7": 0, "f8": 0, "f9": 0, "f10": 0, "f11": 0, "f12": 0, "f13": 0, "f14": 0, "f15": 0, "f16": 0, "f17": 0, "f18": 0, "f19": 0, "f20": 0, "f21": 0, "f22": 0, "f23": 0, "f24": 0, "f25": 0}


def read_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return []


def write_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file)


@app.route('/homescreen', methods=['GET'])
def home():
    return("Homescreen :)")


@app.route('/')
def home2():
    return render_template('index.html')


@app.route('/add', methods=['POST'])
def add_data():
    data = request.json.get('data')
    if data:
        response = (
            supabase.table("game_data")
            .update({"data": data})
            .eq("id", 1)
            .execute()
        )
        return jsonify({"success": True, "data": response.data}), 200
    else:
        return jsonify({"message": "No data provided"}), 400


@app.route('/list', methods=['GET'])
def get_list():
    response = supabase.table("game_data").select("data").execute()
    return jsonify(response.data), 200

@app.route('/reset', methods=['GET'])
def reset_data():
    response = (
        supabase.table("game_data")
        .update({"data": default_json})
        .eq("id", 1)
        .execute()
    )
    return jsonify({"success": True, "data": response.data}), 200


if __name__ == '__main__':
    app.run(debug=True)


