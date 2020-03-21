#!/usr/bin/env python
from textblob import TextBlob

# polarity [-1.0, 1.0]
# subjectivity [0.0, 1.0] where 0 objective and 1 subjective
def check_sentiment(text_string):
    blob = TextBlob(text_string)
    return(blob.sentiment.polarity, blob.sentiment.subjectivity)
