import { Http } from "./http";
import { Tweet } from "./tweet";
import { User } from "./user";

export {
  Tweet,
  User,
};

interface LoginPayload {
  handle: string;
  password: string;
}

interface LoginResponse {
  error: string;
  token: string;
  user: User;
}

export class Api extends Http {
  public async login(handle: string, password: string) : Promise<User> {
    const status = await this.post<LoginPayload, LoginResponse>("/login", {
      handle,
      password,
    });

    if (status.error) {
      throw new Error(status.error);
    }

    this.session.token = status.token;
    this.session.user = status.user;

    return status.user;
  }

  public logout() {
    this.session.token = "";
    this.session.user = {} as any;
  }
}
