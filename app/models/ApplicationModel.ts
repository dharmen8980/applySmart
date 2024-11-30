import { EVENTTYPE, INSTITUTIONTYPE, STATUS } from "../types/enum/page";

export interface ActiveApplication {
  application_type: INSTITUTIONTYPE;
  institution_name: string;
  location: string;
  role_program: string;
  application_link: string;
  status: STATUS;
  notes: string;
}

export interface Wishlist {
  application_type: INSTITUTIONTYPE;
  institution_name: string;
  location: string;
  role_program: Date;
  posting_date?: Date;
  deadline?: string;
}

export interface Calendar {
  institution_name: string;
  event_title: string;
  event_date: Date;
}
