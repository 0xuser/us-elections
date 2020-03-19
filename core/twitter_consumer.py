#!/usr/bin/env python
import twitter
import yaml
import core.sentiment_analysis
from core.sentiment_analysis import check_sentiment

# Retrieve  API credentials
yaml.warnings({'YAMLLoadWarning': False})
apiCred = yaml.load(open('../config/twitter.yaml'))
consumer_key = apiCred['consumer_key']
consumer_secret = apiCred['consumer_secret']
access_token_key = apiCred['access_token_key']
access_token_secret = apiCred['access_token_secret']

api = twitter.Api(consumer_key=consumer_key, consumer_secret=consumer_secret, access_token_key=access_token_key, access_token_secret=access_token_secret)

#users = api.GetFriends()
#print([u.name for u in users])

result = check_sentiment("I much like pretty girls.")
print(result[0])
print(result[1])
