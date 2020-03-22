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
    profile_image_full_url = user_info.profile_image_url.replace("normal", "400x400")
    content = {'id': username_id,
               'name': user_info.name,
               'twitter_name' : user_info.screen_name,
               'location' : user_info.location,
               'description' :user_info.description,
               'url' : user_info.url,
               'followers_count' : user_info.followers_count,
               'profile_image_url' : user_info.profile_image_url,
               'profile_image_full_url': profile_image_full_url,
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
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE is_retweeted = 0;')
        queryStrings.append('SELECT AVG(sentiment_subjectivity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE sentiment_polarity <> 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity > 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity < 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity = 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity > 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity < 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity = 0;')

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
                   'average_sentiment_polarity_without_neutral': amounts[5],
                   'classified_positive': amounts[6],
                   'classified_negative': amounts[7],
                   'classified_neutral': amounts[8],
                   'classified_positive_without_retweets': amounts[9],
                   'classified_negative_without_retweets': amounts[10],
                   'classified_neutral_without_retweets': amounts[11]
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
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE is_retweeted = 0;')
        queryStrings.append('SELECT AVG(sentiment_subjectivity) from ' + table_name + ';')
        queryStrings.append('SELECT AVG(sentiment_polarity) from ' + table_name + ' WHERE sentiment_polarity <> 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity > 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity < 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE sentiment_polarity = 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity > 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity < 0;')
        queryStrings.append('SELECT COUNT(*) from ' + table_name + ' WHERE is_retweeted = 0 AND sentiment_polarity = 0;')

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
                   'average_sentiment_polarity_without_neutral': amounts[5],
                   'classified_positive' : amounts[6],
                   'classified_negative' : amounts[7],
                   'classified_neutral' : amounts[8],
                   'classified_positive_without_retweets': amounts[9],
                   'classified_negative_without_retweets': amounts[10],
                   'classified_neutral_without_retweets': amounts[11]
                   }
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/collectedTweets/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_collected_tweets(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), COUNT(*) FROM ' + table_name + ' WHERE tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'collected_tweets': amount[1]}
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/collectedRetweets/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_collected_retweets(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), COUNT(*) FROM ' + table_name + ' WHERE is_retweeted = 1 AND tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'collected_retweets': amount[1]}
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/averageSentimentPolarity/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_average_sentiment_polarity(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), AVG(sentiment_polarity) FROM ' + table_name + ' WHERE tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'average_sentiment_polarity': amount[1]}
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/averageSentimentPolarityWithoutRetweets/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_average_sentiment_polarity_without_retweets(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), AVG(sentiment_polarity) FROM ' + table_name + ' WHERE is_retweeted = 0 AND tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'average_sentiment_polarity_without_retweets': amount[1]}
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/averageSentimentSubjectivity/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_average_sentiment_subjectivity(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), AVG(sentiment_subjectivity) FROM ' + table_name + ' WHERE tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'average_sentiment_subjectivity': amount[1]}
        payload.append(content)
    return jsonify(payload)

# remember to use without # character
# use YYYY-MM-DD format date ex. 2020-02-05, will be rewritten to use json request
@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/countPositive/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_count_positive(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), COUNT(*) FROM ' + table_name + ' WHERE sentiment_polarity > 0 AND tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'classified_positive': amount[1]}
        payload.append(content)
    return jsonify(payload)

@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/countNegative/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_count_negative(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), COUNT(*) FROM ' + table_name + ' WHERE sentiment_polarity < 0 AND tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'classified_negative': amount[1]}
        payload.append(content)
    return jsonify(payload)

@twitter_blueprint.route('/getSearchAnalysissAggregatedByDays/countNeutral/<search>/<from_date>/<to_date>')
def get_search_analysiss_aggregated_count_neutral(search, from_date, to_date):
    search = '#' + search
    table_name = constants.SEARCH_TAGS[search]
    payload = []
    queryString = 'SELECT CONCAT(YEAR(tweet_creation), "-", MONTH(tweet_creation), "-", DAY(tweet_creation)), COUNT(*) FROM ' + table_name + ' WHERE sentiment_polarity = 0 AND tweet_creation BETWEEN CAST("' + from_date + '" AS DATE) AND CAST("' + to_date + '" AS DATE) GROUP BY YEAR(tweet_creation), MONTH(tweet_creation), DAY(tweet_creation);'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    amounts = cur.fetchall()
    for amount in amounts:
        content = {'date': amount[0],
                   'classified_neutral': amount[1]}
        payload.append(content)
    return jsonify(payload)