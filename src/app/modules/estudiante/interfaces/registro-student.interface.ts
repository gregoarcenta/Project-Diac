export interface EstudianteList{
    students: RegistroStudent[];
    
}

export interface RegistroStudent {
  
    id: number;
    nameStudent:     string;
    lastNameStudent: string;
    edad:            number;
    dateOfBirth:     string;
    numBrothers:     number;
    placeOccupies:   number;
    tutor:           string;
    nameFather:      string;
    nameMother:      string;
    address:         string;
    town:            string;
    province:        string;
    postalCode:      number;
    phone:           string;
    course:          string;
    parallel:        string;
    schoolYear:      string;
}


export interface StudentBodyCreate {
    nameStudent:     string;
    lastNameStudent: string;
    edad:            number;
    dateOfBirth:     string;
    numBrothers:     number;
    placeOccupies:   number;
    tutor:           string;
    nameFather:      string;
    nameMother:      string;
    address:         string;
    town:            string;
    province:        string;
    postalCode:      number;
    phone:           string;
    course:          string;
    parallel:        string;
    schoolYear:      string;
}

