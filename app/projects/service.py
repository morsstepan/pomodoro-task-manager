from ..repository import Repository
from ..repository.mongo import ProjectsMongoRepository
from .schema import ProjectSchema


class ProjectsService(object):
    def __init__(self, user_id, repo_client=Repository(adapter=ProjectsMongoRepository)):
        self.repo_client = repo_client
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")

    def find_all_projects(self):
        projects = self.repo_client.find_all({'user_id': self.user_id})
        return [self.dump(project) for project in projects]

    def find_project(self, project_id):
        project = self.repo_client.find({'user_id': self.user_id, 'project_id': project_id})
        return self.dump(project)

    def create_project_with(self, project_data):
        self.repo_client.create(self.prepare_project(project_data))
        return self.dump(project_data.data)

    def update_project_with(self, project_id, project_data):
        records_affected = self.repo_client.update({'user_id': self.user_id, 'project_id': project_id}, self.prepare_project(project_data))
        return records_affected > 0

    def delete_project_for(self, project_id):
        records_affected = self.repo_client.delete({'user_id': self.user_id, 'project_id': project_id})
        return records_affected > 0

    def dump(self, data):
        return ProjectSchema(exclude=['_id']).dump(data).data

    def prepare_project(self, project_data):
        data = project_data.data
        data['user_id'] = self.user_id
        return data