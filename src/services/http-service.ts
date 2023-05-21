import ListResponse from "../models/list-response";
import Todo from "../models/todo";
import TodoCreateRequest from "../models/todo-create-request";
import TodoUpdateDone from "../models/todo-update-done";

class HttpService {
  private baseUrl: string = "http://localhost:8080";

  public async getAll(): Promise<ListResponse<Todo>> {
    const response = await fetch(`${this.baseUrl}/todos`);
    if (!response.ok) {
      throw new Error("Fetching todos failed");
    }
    const data: ListResponse<Todo> = await response.json();
    return data;
  }

  public async add(request: TodoCreateRequest): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("Creating todo failed");
    }
    const data: Todo = await response.json();
    return data;
  }

  public async updateDone(id: string, done: boolean) : Promise<void> {
    const data: TodoUpdateDone = {
      done: done,
    };
    const response = await fetch(`${this.baseUrl}/todos/${id}/done`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Updating todo failed");
    }
  }

  public async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Deleting todo failed");
    }
  }
}

const httpService = new HttpService();

export default httpService;