export interface Asignatura {
  nameCourse: string;
  destrezas: DestrezaElement[];
  objectives: Objective[];
  criteria: Criteria[];
}

export interface DestrezaElement {
  nameDestreza: string;
}

export interface Objective {
  nameObjective: string;
}
export interface Criteria {
  nameCriteria: string;
}
