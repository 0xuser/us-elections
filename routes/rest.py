#!/usr/bin/env python
from flask import Blueprint, jsonify
from core.database import mysql
import json

from core.twitter_client import get_user_info
import config.constants as constants
twitter_blueprint = Blueprint('twitter_blueprint', __name__)

@twitter_blueprint.route('/getTrackedUsers')
def get_tracked_users():
    payload = []
    for username in constants.TRACKING_USERS:
        username_id = constants.TRACKING_USERS[username]
        content = {'username': username, 'username_id': username_id}
        payload.append(content)
    return jsonify(payload)

@twitter_blueprint.route('/getTrackedSearches')
def get_tracked_searches():
    payload = []
    for search in constants.SEARCH_TAGS:
        table_name = constants.SEARCH_TAGS[search]
        content = {'search': search, 'table_name': table_name}
        payload.append(content)
    return jsonify(payload)

@twitter_blueprint.route('/getUser/<username_id>')
def get_user(username_id):
    user_info = get_user_info(username_id)
    content = {'id': username_id,
               'name': user_info.name,
               'twitter_name' : user_info.screen_name,
               'location' : user_info.location,
               'description' :user_info.description,
               'url' : user_info.url,
               'followers_count' : user_info.followers_count,
               'profile_image_url' : user_info.profile_image_url,
               'profile_banner_url' : user_info.profile_banner_url}
    return jsonify(content)

@twitter_blueprint.route('/getUsersAnalysissOverall')
def get_users_analysiss_overall():
    payload = []
    for username in constants.TRACKING_USERS:
        table_name = 'user_tweets_' + username.lower()

        queryStrings = []
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ';')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 1;')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE is_retweeted = 1;')
        queryStrings.append('SELECT AVG(sentiment_subjectivity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE sentiment_polarity <> 0;')

        cur = mysql.connection.cursor()

        amounts = []
        for query in queryStrings:
            cur.execute(query)
            amount = cur.fetchone()
            amounts.append(amount[0])

        content = {'username': username,
                   'collected_tweets': amounts[0],
                   'retweets_in_collected': amounts[1],
                    'average_sentiment_polarity': amounts[2],
                   'average_sentiment_polarity_without_retweets': amounts[3],
                   'average_sentiment_subjectivity': amounts[4],
                   'average_sentiment_polarity_without_neutral': amounts[5]
                   }
        payload.append(content)
    return jsonify(payload)

@twitter_blueprint.route('/getSearchAnalysissOverall')
def get_search_analysiss_overall():
    payload = []
    for search in constants.SEARCH_TAGS:
        table_name = constants.SEARCH_TAGS[search]

        queryStrings = []
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ';')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 1;')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE is_retweeted = 1;')
        queryStrings.append('SELECT AVG(sentiment_subjectivity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE sentiment_polarity <> 0;')

        cur = mysql.connection.cursor()

        amounts = []
        for query in queryStrings:
            cur.execute(query)
            amount = cur.fetchone()
            amounts.append(amount[0])

        content = {'search': search,
                   'collected_tweets': amounts[0],
                   'retweets_in_collected': amounts[1],
                   'average_sentiment_polarity': amounts[2],
                   'average_sentiment_polarity_without_retweets': amounts[3],
                   'average_sentiment_subjectivity': amounts[4],
                   'average_sentiment_polarity_without_neutral': amounts[5]
                   }
        payload.append(content)
    return jsonify(payload)