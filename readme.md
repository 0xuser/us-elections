## US Elections Twitter Analytics
### Requirements
- python 3.7.7
- pip install mysqlclient-1.4.6-cp37-cp37m-win_amd64.whl
- pip install requirements.txt
- create scheama from schema.sql
- change absolute paths

#### Create config/db.yaml

- mysql_host: 'your mysql host eg. localhost'
- mysql_user: 'mysql db user'
- mysql_password: 'user password'
- mysql_db: 'db name'


#### Create twitter.yaml

Generate your API key on:
https://developer.twitter.com/en/apps

- consumer_key: 'twitter consumer key'
- consumer_secret: 'twitter consumer secret key'
- access_token_key: 'twitter api token'
- access_token_secret: 'twitter api token secret'

#### TO DO:
- pip frezee -> requirements.txt
- rewrite to use SqlAlchemy
- use json requests (some endpoints takes date as a string - temporary solution)

#### Remember to:
- perform batch transactions

#### Frontend
in "my-app" directory
