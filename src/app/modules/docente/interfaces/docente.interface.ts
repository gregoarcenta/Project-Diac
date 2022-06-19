export interface DocenteList {
  teachers: Teacher[];
}

export interface Teacher {
  id: number;
  nameTeacher: string;
  lastNameTeacher: string;
  edad: number;
  email: string;
  CourseId: number;
  Course: Course;
}

export interface TeacherBodyCreate {
  nameTeacher: string;
  lastNameTeacher: string;
  edad: number;
  email: string;
  courseId: number;
  username?: string;
  password?: string;
  idRole?: number;
}

export interface TeacherResponseAfterCreate {
  id: number;
  nameTeacher: string;
  lastNameTeacher: string;
  edad: number;
  email: string;
  courseId: number;
}

export interface Course {
  id: number;
  nameCourse: string;
}
