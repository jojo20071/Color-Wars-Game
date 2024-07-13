from flask import Flask, send_file, jsonify,render_template
from flask import request
import json
import os

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
        data_list = read_data()
        data_list.append(data)
        write_data(data_list)
        return jsonify({"message": "Data added successfully"}), 201
    else:
        return jsonify({"message": "No data provided"}), 400


@app.route('/list', methods=['GET'])
def get_list():
    data_list = read_data()
    return jsonify(data_list), 200

@app.route('/reset', methods=['GET'])
def reset_data():
    data = default_json
    if data:
        data_list = read_data()
        data_list.append(data)
        write_data(data_list)
        return jsonify({"message": "Data reset sucseffuly"}), 201
    else:
        return jsonify({"message": "No data provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
