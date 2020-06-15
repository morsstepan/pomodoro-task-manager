import os
from pymongo import MongoClient

class MongoRepository(object):
    def __init__(self, collection_name):
        mongo_url = os.environ.get('MONGO_URL')
        self.db = MongoClient(mongo_url).pmanager
        self.collection_name = collection_name

    def find_all(self, selector):
        return self.db[self.collection_name].find(selector)

    def find(self, selector):
        return self.db[self.collection_name].find_one(selector)

    def create(self, entity):
        return self.db[self.collection_name].insert_one(entity)

    def update(self, selector, entity):
        return self.db[self.collection_name].replace_one(selector, entity).modified_count

    def delete(self, selector):
        return self.db[self.collection_name].delete_one(selector).deleted_count


class ProjectsMongoRepository(MongoRepository):
    def __init__(self):
        super(ProjectsMongoRepository, self).__init__('projects')