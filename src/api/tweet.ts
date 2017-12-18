import { User } from "./user";

export interface Tweet {
  _id: string;
  message: string;
  imageUrl: string;
  time: Date;
  user: User;
}
