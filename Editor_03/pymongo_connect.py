# -- Terminal: pip install pymongo
# -- Terminal: pip3 install pymongo[srv]
import collections
import pymongo
from pymongo import MongoClient

# -- Terminal: pip install certifi
import certifi
ca = certifi.where()

import datetime
from datetime import datetime

# connection
# get uri from mongoAtlas "Connect"
cluster = MongoClient("mongodb+srv://user0:pass123@cluster0.beooq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", tlsCAFile=ca)

# choose the db we want
db = cluster["US_Input"]

# -- choose the collection
# -- collections are mini db with post, look like dictionaries
collection = db["US_Collection"]

# -- creating posts
# post = {"_id": 200, "US_raw": "The system should have blue and as the main color scheme", "time": str(datetime.now())}
post1 = {"_id": 201, "US_raw": "The system should require login and password", "time": str(datetime.now())}
post2 = {"_id": 202, "US_raw": "The system should be hosted to GitHub", "time": str(datetime.now())}

# -- How to add something
# collection.insert_one(post)
# collection.insert_many([post1, post2])

db_retrieve = collection.find({"_id": 200})

for r in db_retrieve:
    print(r)
    print(r["US_raw"])