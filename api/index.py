from flask import Flask, send_file, jsonify,render_template
from flask import request


app = Flask(__name__)






@app.route('/', methods=['GET'])
def home():
    return("Homescreen :)")


@app.route('/h')
def home2():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

