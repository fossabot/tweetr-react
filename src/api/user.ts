export interface User {
  name: string;
  handle: string;
  imageUrl: string;
  follows: User[];
  role: string;
}
