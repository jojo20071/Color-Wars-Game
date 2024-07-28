from flask import Blueprint, render_template

StartSite = Blueprint('StartSite', __name__, template_folder='templates')

@StartSite.route('/')
def home():
    return render_template('StartSite.html')