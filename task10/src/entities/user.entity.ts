export interface UserEntity {
  id: string; // uuid
  email: string;
  password: string;
  role: RoleType;
}

enum RoleType {
  user = "user",
  admin = "admin",
}
