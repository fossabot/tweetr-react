import { SocialGraphDescription } from "../components/social-graph";
import { Http } from "./http";
import { Tweet } from "./tweet";
import { User } from "./user";

export {
  Tweet,
  User,
};

interface ApiResponse {
  error: string;
  message: string;
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
}
