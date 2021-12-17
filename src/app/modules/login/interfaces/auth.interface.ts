export interface AuthUser {
  user: User;
  jwt: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  RoleId: number;
  Role: Role;
}

export interface Role {
  id: number;
  nameRol: string;
}
