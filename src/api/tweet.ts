import { User } from "./user";

export interface Tweet {
  id: string;
  message: string;
  time: Date;
  user: User;
}
