export interface InstitutionList {
  institutions: Institution[];
}

export interface Institution {
  id: number;
  nameInstitution: string;
  district: string;
  address: string;
  locationInstitution: string;
  postalCode: number;
  phone: number;
  modality: string;
  type: string;
}

export interface InstitutionBodyCreate {
  nameInstitution: string;
  district: string;
  address: string;
  locationInstitution: string;
  postalCode: number;
  phone: number;
  modality: string;
  type: string;
}
