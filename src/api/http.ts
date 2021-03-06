import { Authorization } from "./authorization";

export class Http {
  private authorization: Authorization;

  public get session() : Authorization {
    return this.authorization;
  }

  public get server() : string {
    return "https://tweetr-us-west-1.herokuapp.com";
  }

  private get location() : string {
    return `${this.server}/api`;
  }

  constructor() {
    this.authorization = new Authorization();
  }

  public async get<T>(endpoint: string) : Promise<T> {
    const headers = new Headers();

    headers.append("Accept", "application/json");

    if (this.authorization.token) {
      headers.append("Authorization", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      headers,
      method: "get",
    });

    return response.json();
  }

  public async delete<T>(endpoint: string) : Promise<T> {
    const headers = new Headers();

    headers.append("Accept", "application/json");

    if (this.authorization.token) {
      headers.append("Authorization", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      headers,
      method: "delete",
    });

    return response.json();
  }

  public async post<TPayload, TResponse>(endpoint: string, payload: TPayload) : Promise<TResponse> {
    const headers = new Headers();

    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    if (this.authorization.token) {
      headers.append("Authorization", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      body: JSON.stringify(payload),
      headers,
      method: "post",
    });

    return response.json();
  }

  public async postForm<T>(endpoint: string, form: FormData) : Promise<T> {
    const headers = new Headers();

    headers.append("Accept", "application/json");

    if (this.authorization.token) {
      headers.append("Authorization", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      body: form,
      headers,
      method: "post",
    });

    return response.json();
  }
}
