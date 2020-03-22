#!/usr/bin/env python
import tweepy
import yaml
import config.constants as constants
from core.database import mysql
from core.sentiment_analysis import check_sentiment

path = constants.TWITTER_CONFIG_YAML_PATH
yaml.warnings({'YAMLLoadWarning': False})
apiCred = yaml.load(open(path))
consumer_key = apiCred['consumer_key']
consumer_secret = apiCred['consumer_secret']
access_token_key = apiCred['access_token_key']
access_token_secret = apiCred['access_token_secret']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token_key, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

def get_last_tweet_id(table_name):
    queryString = 'SELECT tweet_id from ' + table_name + ' ORDER BY id DESC LIMIT 1;'
    cur = mysql.connection.cursor()
    cur.execute(queryString)
    result = cur.fetchone()
    if result is None:
        return 0
    else:
        return result[0]

def retrieve_tweets_by_search(query, since_post_id, table_name, max_records):
    if since_post_id == 0:
        tweets = api.search(q=query, count=max_records, tweet_mode="extended")
    else:
        tweets = api.search(q=query, count=max_records, tweet_mode="extended", since_id=since_post_id)

    i = len(tweets)-1
    print(f"\tfetching {i+1} new tweets")
    while i >= 0:
        tweet_poster_name = tweets[i].user.screen_name
        tweet_id = tweets[i].id
        tweet_creation = tweets[i].created_at
        tweet_description = tweets[i].full_text
        sentiment = check_sentiment(tweet_description)

        if hasattr(tweets[i], 'retweeted_status'):
            # Retweet case
            original_poster_name = tweets[i].retweeted_status.user.screen_name
            original_tweet_id = tweets[i].retweeted_status.id
            is_retweeted = 1
            queryString = f"INSERT INTO `{constants.DATABASE_NAME}`.`{table_name}` (`tweet_id`, `tweet_creation`, `tweet_poster_name`, `is_retweeted`, `original_poster_name`, `original_tweet_id`, `sentiment_polarity`, `sentiment_subjectivity`) VALUES ('{tweet_id}', '{tweet_creation}', '{tweet_poster_name}', '{is_retweeted}', '{original_poster_name}', '{original_tweet_id}', '{sentiment[0]}', '{sentiment[1]}');"
        else:
            is_retweeted = 0
            queryString = f"INSERT INTO `{constants.DATABASE_NAME}`.`{table_name}` (`tweet_id`, `tweet_creation`, `tweet_poster_name`, `is_retweeted`, `sentiment_polarity`, `sentiment_subjectivity`) VALUES ('{tweet_id}', '{tweet_creation}', '{tweet_poster_name}', '{is_retweeted}', '{sentiment[0]}', '{sentiment[1]}');"

        mycursor = mysql.connection.cursor()
        mycursor.execute(queryString)
        mysql.connection.commit()
        i -= 1


def retrieve_users_tweets(username_id, since_post_id, table_name, max_records):
    if since_post_id == 0:
        tweets = api.user_timeline(id=username_id, count=max_records, tweet_mode="extended")
    else:
        tweets = api.user_timeline(id=username_id, count=max_records, tweet_mode="extended", since_id=since_post_id)

    i = len(tweets)-1
    print(f"\tfetching {i+1} new tweets")
    while i >= 0:
        tweet_id = tweets[i].id
        tweet_creation = tweets[i].created_at
        tweet_description = tweets[i].full_text
        sentiment = check_sentiment(tweet_description)

        if hasattr(tweets[i], 'retweeted_status'):
            # Retweet case
            original_poster_name = tweets[i].retweeted_status.user.screen_name
            original_tweet_id = tweets[i].retweeted_status.id
            is_retweeted = 1
            queryString = f"INSERT INTO `{constants.DATABASE_NAME}`.`{table_name}` (`tweet_id`, `tweet_creation`, `is_retweeted`, `original_poster_name`, `original_tweet_id`, `sentiment_polarity`, `sentiment_subjectivity`) VALUES ('{tweet_id}', '{tweet_creation}', '{is_retweeted}', '{original_poster_name}', '{original_tweet_id}', '{sentiment[0]}', '{sentiment[1]}');"
        else:
            is_retweeted = 0
            queryString = f"INSERT INTO `{constants.DATABASE_NAME}`.`{table_name}` (`tweet_id`, `tweet_creation`, `is_retweeted`, `sentiment_polarity`, `sentiment_subjectivity`) VALUES ('{tweet_id}', '{tweet_creation}', '{is_retweeted}', '{sentiment[0]}', '{sentiment[1]}');"

        mycursor = mysql.connection.cursor()
        mycursor.execute(queryString)
        mysql.connection.commit()
        i -= 1

def get_user_info(username_id):
    user_info = api.get_user(id = username_id)
    return user_info


