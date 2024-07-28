from flask import Flask
from GameSite.routes import GameSite
from StartSite.routes import StartSite

app = Flask(__name__)
app.register_blueprint(GameSite, url_prefix='/GameSite')
app.register_blueprint(StartSite, url_prefix='/StartSite')

if __name__ == '__main__':
    app.run(debug=True)