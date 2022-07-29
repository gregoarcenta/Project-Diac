export interface AsignaturaList {
  courses: Course[];
}

export interface Course {
  id: number;
  nameCourse: string;
  Destrezas: Destreza[];
  Objectives: Objective[];
  criterios: Criterios[];
}

export interface Destreza {
  id: number;
  nameDestreza: string;
  CourseId: number;
}

export interface Objective {
  id: number;
  nameObjective: string;
  CourseId: number;
}

export interface Criterios {
  id: number;
  nameCriteria: string;
  CourseId: number;
}
