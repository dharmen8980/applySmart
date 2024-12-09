import { INSTITUTIONTYPE, STATUS } from "../types/enum/page";

export interface ActiveApplication {
  application_type: INSTITUTIONTYPE;
  institution_name: string;
  location: string;
  role_program: string;
  application_link: string;
  status: STATUS;
  notes: string;
}

export interface ApplicationData {
  application_id: number;
  email: string;
  institution_name: string;
  location: string;
  role_program: string;
  status: string;
  next_event_date: string;
}

export interface Wishlist {
  application_type: INSTITUTIONTYPE;
  institution_name: string;
  role_program: Date;
  posting_date?: Date;
  deadline?: string;
}

export interface Event {
  event_id?: number;
  application_id: number;
  event_date: Date;
  event_title: string;
}

export interface ApplicationGroup {
  status: string;
  count: number;
}

export interface EventSummaryStats {
  labelCode: number
  count: number
}

export interface EventApplicationDropdown {
  application_id: number;
  institution_name: string;
}