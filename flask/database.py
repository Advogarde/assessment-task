import pymongo
from config import MONGO_URL

myclient = pymongo.MongoClient(MONGO_URL)
mydb = myclient["silber"]
mycol = mydb["contact-form"]
