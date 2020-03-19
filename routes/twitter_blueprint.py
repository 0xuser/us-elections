#!/usr/bin/env python
from flask import Blueprint, jsonify
from core.database import mysql

twitter_blueprint = Blueprint('twitter_blueprint', __name__)

@twitter_blueprint.route('/getTweets')
def get_tweets():
    queryString = '''SELECT * FROM tweets'''
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    rv = cur.fetchall()
    #return str(rv)

    # to json
    payload = []
    for result in rv:
        content = {'id': result[0], 'author': result[1], 'desc': result[2]}
        payload.append(content)
    return jsonify(payload)