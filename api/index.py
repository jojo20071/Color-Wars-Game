from flask import Flask, send_file, jsonify
from flask import request


app = Flask(__name__)






@app.route('/', methods=['GET'])
def home():
    return("Homescreen :)")



if __name__ == '__main__':
    app.run(debug=True)

