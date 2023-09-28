export interface User {
  id: number;
  name: string;
  email: string;
  hobbies: string[];
}

export type NewUser = Omit<User, "id">;
