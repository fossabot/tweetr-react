import { Authorization } from "./authorization";

export class Http {
  private authorization: Authorization;

  public get session() : Authorization {
    return this.authorization;
  }

  private get location() : string {
    return "https://tweetr-us-west-1.herokuapp.com/api";
  }

  constructor() {
    this.authorization = new Authorization();
  }

  protected async get<T>(endpoint: string) : Promise<T> {
    const headers = new Headers();

    headers.append("Accept", "application/json");

    if (this.authorization.isLoggedIn) {
      headers.append("Authentication", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      headers,
      method: "get",
    });

    return response.json();
  }

  protected async post<TPayload, TResponse>(endpoint: string, payload: TPayload) : Promise<TResponse> {
    const headers = new Headers();

    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    if (this.authorization.isLoggedIn) {
      headers.append("Authentication", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      body: JSON.stringify(payload),
      headers,
      method: "post",
    });

    return response.json();
  }

  protected async postForm<T>(endpoint: string, form: FormData) : Promise<T> {
    const headers = new Headers();

    headers.append("Accept", "application/json");
    headers.append("Content-Type", "multipart/form-data");

    if (this.authorization.isLoggedIn) {
      headers.append("Authentication", `Bearer ${this.authorization.token}`);
    }

    const response = await fetch(`${this.location}${endpoint}`, {
      body: form,
      headers,
      method: "post",
    });

    return response.json();
  }
}
