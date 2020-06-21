from ..repository import Repository
from ..repository.mongo import TodosMongoRepository
from .schema import UserTodoSchema


class TodosService(object):
    def __init__(self, user_id, repo_client=Repository(adapter=TodosMongoRepository)):
        self.repo_client = repo_client
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")

    def find_all_todos(self):
        todos = self.repo_client.find_all({'user_id': self.user_id})
        return [self.dump(todo) for todo in todos]

    def find_project_todos(self, project_id):
        todos = self.repo_client.find_all({'user_id': self.user_id, 'project_id': project_id})
        return [self.dump(todo) for todo in todos]

    def find_todo(self, todo_id):
        todo = self.repo_client.find({'user_id': self.user_id, 'id': todo_id})
        return self.dump(todo)

    def create_todo_with(self, todo_data, project_id):
        self.repo_client.create(self.prepare_todo(todo_data, project_id))
        return self.dump(todo_data)

    def update_todo_with(self, todo_id, todo_data, project_id):
        records_affected = self.repo_client.update({'user_id': self.user_id, 'id': todo_id}, self.prepare_todo(todo_data, project_id))
        return records_affected > 0

    def delete_todo_for(self, todo_id):
        records_affected = self.repo_client.delete({'user_id': self.user_id, 'id': todo_id})
        return records_affected > 0

    def dump(self, data):
        return UserTodoSchema(exclude=['user_id']).dump(data)

    def prepare_todo(self, todo_data, project_id):
        data = todo_data
        data['user_id'] = self.user_id
        data['project_id'] = project_id
        return data
