#!/usr/bin/env python
from flask import Flask
from flask_mysqldb import MySQL
import yaml
from datetime import datetime
from core.database import mysql
import requests
import atexit
from apscheduler.scheduler import Scheduler
import config.constants as constants
from core.twitter_client import retrieve_tweets_by_search, get_last_tweet_id, retrieve_users_tweets
from routes.rest import twitter_blueprint

app = Flask(__name__)

cron = Scheduler(daemon=True)
# Explicitly kick off the background thread
cron.start()

# register all blueprints
app.register_blueprint(twitter_blueprint, url_prefix='/api')

# load database config
yaml.warnings({'YAMLLoadWarning': False})
path = constants.DATABASE_CONFIG_YAML_PATH
db = yaml.load(open(path))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
app.config['MYSQL_CHARSET'] = db['charset']
mysql = MySQL(app)

@app.route('/')
def index():
    return "Server is running fine"


# cheating flask
if constants.SCHEDULER_WORK:
    @cron.interval_schedule(minutes=constants.SEARCH_SCHEDULER_MINUTES)
    def search_trigger():
        res = requests.get('http://localhost:5000/local/fetchNewTweetsBySearch')

    @cron.interval_schedule(minutes=constants.USER_SCHEDULER_MINUTES)
    def user_trigger():
        res = requests.get('http://localhost:5000/local/fetchNewUsersTweets')


@app.route('/local/fetchNewTweetsBySearch')
def fetch_new_tweets():
    now = datetime.now()
    print(f"{now}: fetching new data by search..")

    for search_query in constants.SEARCH_TAGS:
        table_name = constants.SEARCH_TAGS[search_query]
        print(f"for table: {table_name}")
        last_tweet_id = get_last_tweet_id(table_name)
        retrieve_tweets_by_search(query=search_query, since_post_id=last_tweet_id, max_records=constants.SEARCH_TWEETS_FETCH_SIZE, table_name=table_name)
    return 'Executed'

@app.route('/local/fetchNewUsersTweets')
def fetch_new_users_tweets():
    now = datetime.now()
    print(f"{now}: fetching new defined users tweets..")
    for username in constants.TRACKING_USERS:
        print(f"for user: {username}")
        username_id = constants.TRACKING_USERS[username]
        table_name = 'user_tweets_' + username.lower()
        last_tweet_id = get_last_tweet_id(table_name)
        retrieve_users_tweets(username_id=username_id, since_post_id=last_tweet_id, max_records=constants.USER_TWEETS_FETCH_SIZE, table_name=table_name)
    return 'Executed'


# Shutdown your cron thread if the web process is stopped
atexit.register(lambda: cron.shutdown(wait=False))
if __name__ == '__main__':
    app.run(use_reloader=False)