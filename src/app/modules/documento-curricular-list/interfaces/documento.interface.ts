export interface Documents {
    docs: Doc[];
    estudiante: Student[];
}

export interface Doc {
    id:                            number;
    duration:                      string;
    infoPedagogica:                string;
    developData:                   string;
    familyBack:                    string;
    historySchool:                 string;
    styleLearning:                 string;
    typeIntelligence:              string;
    dataContextEducation:          string;
    dataContextFamily:             string;
    dataContextSocial:             string;
    identificationEducationalNeed: string;
    adaptationAccessCurriculum:    string;
    specializedIntExt:             string;
    methodology:                   string;
    resourse:                      string;
    resultFinal:                   string;
    createdAt:                     Date;
    updatedAt:                     Date;
    StudentId:                     number;
    InstitutionId:                 number;
    Student:                       Student;
    Courses:                       Course[];
    Institution:                   Institution;
    Teachers:                      Teacher[];
}

export interface Course {
    id:                number;
    nameCourse:        string;
    curricularCourses: Curricular;
}

export interface Curricular {
    createdAt:    Date;
    updatedAt:    Date;
    CourseId?:    number;
    CurricularId: number;
    TeacherId?:   number;
}

export interface Institution {
    id:                  number;
    nameInstitution:     string;
    district:            string;
    address:             string;
    locationInstitution: string;
    postalCode:          number;
    phone:               number;
    modality:            string;
    type:                string;
}

export interface Student {
    id:              number;
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

export interface Teacher {
    id:                 number;
    nameTeacher:        string;
    lastNameTeacher:    string;
    edad:               number;
    email:              string;
    CourseId:           number;
    curricularTeachers: Curricular;
}