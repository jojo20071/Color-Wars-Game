from flask import Flask, send_file, jsonify,render_template
from flask import request


app = Flask(__name__)



data_list = []


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
        data_list.append(data)
        return jsonify({"message": "Data added successfully"}), 201
    else:
        return jsonify({"message": "No data provided"}), 400


@app.route('/list', methods=['GET'])
def get_list():
    return jsonify(data_list), 200

if __name__ == '__main__':
    app.run(debug=True)

