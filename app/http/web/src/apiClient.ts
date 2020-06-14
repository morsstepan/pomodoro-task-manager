import axios, {AxiosRequestConfig} from 'axios';

const BASE_URI = 'http://localhost:4433';

const client = axios.create({
    baseURL: BASE_URI
});

export interface ServerProject {
    id: number;
    name: string;
    due_date: string;
}

class APIClient {
    constructor(private accessToken: string) {}

    createProject(project: ServerProject) {
        return this.perform('post', '/projects', project);
    }

    deleteProject(project: ServerProject) {
        return this.perform('delete', `/projects/${project.id}`);
    }

    getProjects() {
        return this.perform('get', '/projects')
    }

    async perform(method: AxiosRequestConfig["method"], resource: string, data?: ServerProject) {
        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }).then(resp => {
            return resp.data ? resp.data : [];
        })
    }
}

export default APIClient;