import { User } from "./user";

const TOKEN_STORAGE_KEY = "tweetr_token",
      USER_STORAGE_KEY = "tweetr_user";

interface TokenInformation {
  token: string;
  expireDate: Date;
}

export class Authorization {
  public get token() : string {
    const json = localStorage.getItem(TOKEN_STORAGE_KEY) as string,
          info = JSON.parse(json) as TokenInformation;

    if (new Date() > info.expireDate) {
      return "";
    }

    return info.token;
  }

  public set token(value: string) {
    const info: TokenInformation = {
            expireDate: new Date(Date.now() + 60 * 60 * 1000),
            token: value,
          },
          json = JSON.stringify(info);

    localStorage.setItem(TOKEN_STORAGE_KEY, json);
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
