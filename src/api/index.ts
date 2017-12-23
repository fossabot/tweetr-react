import { SocialGraphDescription } from "../components/social-graph";
import { Authorization } from "./authorization";
import { Http } from "./http";
import { Tweet } from "./tweet";

import {
  User,
  UserRole,
} from "./user";

export {
  Tweet,
  User,
  UserRole,
};

interface ApiResponse {
  error: string;
  message: string;
}

interface SignupResponse extends ApiResponse {
  user: User;
}

interface LoginPayload {
  handle: string;
  password: string;
}

interface LoginResponse extends ApiResponse {
  token: string;
  user: User;
}

interface CreateTweetResponse extends ApiResponse {
  tweet: Tweet;
}

interface AllTweetsResponse extends ApiResponse {
  tweets: Tweet[];
}

interface AllUsersResponse extends ApiResponse {
  users: User[];
}

interface ViewUserResponse extends ApiResponse {
  socialGraph: SocialGraphDescription;
  tweets: Tweet[];
  user: User;
}

export class Api {
  private readonly http: Http;

  public get session() : Authorization {
    return this.http.session;
  }

  constructor() {
    this.http = new Http();
  }

  public async ping() {
    await this.http.get(this.http.server);
  }

  private async get<TResponse extends ApiResponse>(endpoint: string) : Promise<TResponse> {
    const response = await this.http.get<TResponse>(endpoint);

    if (response.error) {
      throw new Error(response.message);
    }

    return response;
  }

  private async delete<TResponse extends ApiResponse>(endpoint: string) : Promise<TResponse> {
    const response = await this.http.delete<TResponse>(endpoint);

    if (response.error) {
      throw new Error(response.message);
    }

    return response;
  }

  private async post<TPayload, TResponse extends ApiResponse>(endpoint: string, payload: TPayload) : Promise<TResponse> {
    const response = await this.http.post<TPayload, TResponse>(endpoint, payload);

    if (response.error) {
      throw new Error(response.message);
    }

    return response;
  }

  private async postForm<TResponse extends ApiResponse>(endpoint: string, form: FormData) : Promise<TResponse> {
    const response = await this.http.postForm<TResponse>(endpoint, form);

    if (response.error) {
      throw new Error(response.message);
    }

    return response;
  }

  public async signup(handle: string, name: string, password: string, image: File) : Promise<SignupResponse> {
    const data = new FormData();

    data.append("handle", handle);
    data.append("name", name);
    data.append("password", password);
    data.append("image", image);

    return await this.postForm<SignupResponse>("/signup", data);
  }

  public async login(handle: string, password: string) : Promise<User> {
    const status = await this.post<LoginPayload, LoginResponse>("/login", {
      handle,
      password,
    });

    this.session.token = status.token;
    this.session.user = status.user;

    return status.user;
  }

  public logout() {
    this.session.token = "";
    this.session.user = {} as any;
  }

  public async createTweet(message: string, image?: File) {
    const data = new FormData();

    data.append("message", message);

    if (image) {
      data.append("image", image);
    }

    return await this.postForm<CreateTweetResponse>("/tweets", data);
  }

  public async deleteTweet(tweet: Tweet) {
    return await this.delete(`/tweets/${tweet._id}`);
  }

  public async deleteTweets(tweets: Tweet[]) {
    const pool = tweets.map((t) => this.deleteTweet(t));

    for (const worker of pool) {
      await worker;
    }
  }

  public async allTweets() {
    return await this.get<AllTweetsResponse>("/tweets");
  }

  public async firehose() {
    return await this.get<AllTweetsResponse>("/firehose");
  }

  public async allUsers() {
    return await this.get<AllUsersResponse>("/users");
  }

  public async viewUser(handle: string) {
    return await this.get<ViewUserResponse>(`/users/${handle}`);
  }

  public async followUser(user: User) {
    return await this.post(`/follow/${user.handle}`, {});
  }

  public async unfollowUser(user: User) {
    return await this.delete(`/follow/${user.handle}`);
  }

  public async updateAccount(name?: string, image?: File, password?: string) {
    const data = new FormData();

    if (name) {
      data.append("name", name);
    }

    if (image) {
      data.append("image", image);
    }

    if (password) {
      data.append("password", password);
    }

    return await this.postForm<ApiResponse>("/account", data);
  }

  public async purgeTweets() {
    return await this.delete<ApiResponse>("/account/tweets");
  }

  public async promoteToAdmin(user: User) {
    return await this.post<any, ApiResponse>(`/admin/${user.handle}`, {});
  }

  public async degradeToUser(user: User) {
    return await this.delete<ApiResponse>(`/admin/${user.handle}`);
  }

  public async removeUser(user: User) {
    return await this.delete<ApiResponse>(`/users/${user.handle}`);
  }
}
