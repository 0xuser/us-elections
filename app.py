#!/usr/bin/env python
from flask import Flask
from flask_mysqldb import MySQL
import yaml

from routes.twitter_blueprint import twitter_blueprint

app = Flask(__name__)

# register all blueprints
app.register_blueprint(twitter_blueprint, url_prefix='/api')

# load database config
yaml.warnings({'YAMLLoadWarning': False})
db = yaml.load(open('config/db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
mysql = MySQL(app)


@app.route('/')
def index():
    return "Server is running fine"

if __name__ == '__main__':
    app.run(debug=True)