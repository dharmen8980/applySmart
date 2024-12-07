export enum STATUS {
  APPLIED = "APPLIED",
  INPROGRESS = "IN PROGRESS",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum INSTITUTIONTYPE {
  COMPANY = "COMPANY",
  UNIVERSITY = "UNIVERSITY",
}

export enum EVENTTYPE {
  POSTINGDATE = "POSTINGDATE",
  DEADLINE = "DEADLINE",
}

export interface Event {
  id: number;
  date: Date;
  title: string;
  description: string;
}
