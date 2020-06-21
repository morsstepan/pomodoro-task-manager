from .middlewares import login_required
from flask import Flask, json, g, request
from app.projects.service import ProjectsService as Project
from app.projects.schema import ProjectSchema
from app.todos.service import TodosService as Todo
from app.todos.schema import TodoSchema
from flask_cors import CORS
from uuid import UUID

app = Flask(__name__)
CORS(app)


@app.route("/projects", methods=["GET"])
@login_required
def index():
    return json_response(Project(g.user).find_all_projects())


@app.route("/projects", methods=["POST"])
@login_required
def create():
    project_data = ProjectSchema().load(json.loads(request.data))

    # if project_data.errors:
    #     return json_response({'error': project_data.errors}, 422)

    project = Project(g.user).create_project_with(project_data)
    return json_response(project)


@app.route("/projects/<string:project_id>", methods=["GET"])
@login_required
def show(project_id):
    project = Project(g.user).find_project(UUID(project_id))

    if project:
        return json_response(project)
    else:
        return json_response({'error': 'project not found'}, 404)


@app.route("/projects/<string:project_id>", methods=["PUT"])
@login_required
def update(project_id):
    project_data = ProjectSchema().load(json.loads(request.data))

    # if project_data.errors:
    #     return json_response({'error': project_data.errors}, 422)

    project_service = Project(g.user)
    if project_service.update_project_with(UUID(project_id), project_data):
        return json_response(project_data)
    else:
        return json_response({'error': 'project not found'}, 404)


@app.route("/projects/<string:project_id>", methods=["DELETE"])
@login_required
def delete(project_id):
    project_service = Project(g.user)
    if project_service.delete_project_for(UUID(project_id)):
        return json_response({})
    else:
        return json_response({'error': 'project not found'}, 404)


@app.route("/projects/<string:project_id>/todos", methods=["GET"])
@login_required
def index_todos(project_id):
    return json_response(Todo(g.user).find_project_todos(project_id))

@app.route("/projects/<string:project_id>/todos", methods=["POST"])
@login_required
def create_todo(project_id):
    todo_data = TodoSchema().load(json.loads(request.data))

    todo = Todo(g.user).create_todo_with(todo_data, project_id)
    return json_response(todo)

def json_response(payload, status=200):
    return (json.dumps(payload), status, {'Content-Type': 'application/json'})
