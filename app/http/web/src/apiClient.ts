import axios, { AxiosRequestConfig } from "axios";

const BASE_URI = "http://localhost:4433";

const client = axios.create({
  baseURL: BASE_URI,
});

export interface ServerProject {
  id: string;
  name: string;
  due_date: string;
}

export interface ServerTodo {
  id: string;
  name: string;
  checked: boolean;
  due_date: string;
  project_id: string;
}

class APIClient {
  constructor(private accessToken: string) {}

  createProject(project: ServerProject) {
    return this.perform("post", "/projects", project);
  }

  updateProject(project: ServerProject) {
    return this.perform("put", `/projects/${project.id}`, project);
  }

  deleteProject(project: ServerProject) {
    return this.perform("delete", `/projects/${project.id}`);
  }

  getProjects() {
    return this.perform("get", "/projects");
  }

  getProject(id: string) {
    return this.perform("get", "/projects/" + id);
  }

  getTodos(projectId: string) {
    return this.perform("get", `/projects/${projectId}/todos`);
  }

  createTodo(todo: ServerTodo) {
    return this.perform("post", `/projects/${todo.project_id}/todos`, todo);
  }

  deleteTodo(todo: ServerTodo) {
    return this.perform('delete', `/projects/${todo.project_id}/todos/${todo.id}`);
  }

  updateTodo(todo: ServerTodo) {
    return this.perform(
      "put",
      `/projects/${todo.project_id}/todos/${todo.id}`,
      todo
    );
  }

  async perform(
    method: AxiosRequestConfig["method"],
    resource: string,
    data?: object
  ) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then((resp) => {
      return resp.data ? resp.data : [];
    });
  }

  static async getFromService(authService: any): Promise<APIClient> {
    const accessToken = await authService.getAccessToken();
    return new APIClient(accessToken);
  }
}

export default APIClient;
