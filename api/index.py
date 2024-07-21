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

default_json = {"c":"r","f1": [0,"r"], "f2": [0,"r"], "f3": [0,"r"], "f4": [0,"r"], "f5": [0,"r"], "f6": [0,"r"], "f7": [0,"r"], "f8": [0,"r"], "f9": [0,"r"], "f10": [0,"r"], "f11": [0,"r"], "f12": [0,"r"], "f13": [0,"r"], "f14": [0,"r"], "f15": [0,"r"], "f16": [0,"r"], "f17": [0,"r"], "f18": [0,"r"], "f19": [0,"r"], "f20": [0,"r"], "f21": [0,"r"], "f22": [0,"r"], "f23": [0,"r"], "f24": [0,"r"], "f25": [0,"r"]}


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


