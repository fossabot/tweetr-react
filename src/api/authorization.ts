import { User } from "./user";

const TOKEN_STORAGE_KEY = "tweetr_token",
      USER_STORAGE_KEY = "tweetr_user";

export class Authorization {
  public get token() : string {
    return localStorage.getItem(TOKEN_STORAGE_KEY) as string;
  }

  public set token(value: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, value);
  }

  public get user() : User {
    const json = localStorage.getItem(USER_STORAGE_KEY) as string;

    return JSON.parse(json);
  }

  public set user(value: User) {
    const json = JSON.stringify(value);

    localStorage.setItem(USER_STORAGE_KEY, json);
  }

  public get isLoggedIn() : boolean {
    return !!this.token;
  }

  public get loggedInUser() : User {
    return this.user;
  }
}
