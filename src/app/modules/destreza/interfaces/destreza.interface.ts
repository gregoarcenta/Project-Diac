export interface Asignatura {
  nameCourse: string;
  destrezas: DestrezaElement[];
  objectives: Objective[];
}

export interface DestrezaElement {
  nameDestreza: string;
}

export interface Objective {
  nameObjective: string;
}
