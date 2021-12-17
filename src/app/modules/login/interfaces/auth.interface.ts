export interface AuthUser {
  user: User;
  jwt: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  RoleId: number;
  TeacherId: number;
  Role: Role;
  Teacher: Teacher;
}

export interface Role {
  id: number;
  nameRol: string;
}

export interface Teacher {
  id: number;
  nameTeacher: string;
  lastNameTeacher: string;
  edad: number;
  email: string;
  CourseId: number;
}
