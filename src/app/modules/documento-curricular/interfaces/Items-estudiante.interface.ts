export interface ItemPage {
  id: number,
  description: string,
  link: string,
  activated: boolean
  passed: boolean
}

export interface DocumentBodyCreate {
  duration: string;
  infoPedagogica: string;
  developData: string;
  familyBack: string;
  historySchool: string;
  styleLearning: string;
  typeIntelligence: string;
  dataContextEducation: string;
  dataContextFamily: string;
  dataContextSocial: string;
  identificationEducationalNeed: string;
  adaptationAccessCurriculum: string;
  specializedIntExt: string;
  methodology: string;
  resourse: string;
  resultFinal: string;
  studentId: number;
  institutionId: number;
  courses: number[];
  teachers: number[];
}

