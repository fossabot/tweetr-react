import { User } from "./user";

export interface Tweet {
  id: string;
  message: string;
  imageUrl: string;
  time: Date;
  user: User;
}
