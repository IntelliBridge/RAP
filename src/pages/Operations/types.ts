// types.ts

export interface Address {
  line_1: string | null;
  line_2?: string | null;
  city: string | null;
  state: string | null;
  zip_code?: string | null | number;
  country: string | null;
}

export interface Contact {
  first_name: string | null;
  middle_initial?: string | null;
  last_name: string | null;
  title?: string | null;
  address: Address;
}

export interface POC {
  primary: Contact;
  secondary?: Contact;
}

export interface Subcontractor {
  name: string | null;
  url?: string | null;
}

export interface Vendor {
  UEI: string;
  Name: string;
  Description: string;
  url?: string;
}

export interface Files {
  name: string | null;
  size: number | null;
}

export interface Pop {
  start: string | null;
  end: string | null;
}

export interface OperationLocation {
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
}

export interface Content {
  content: string;
}

export interface OperationData {
  unique_id?: string | null;
  id: string | null;
  operation_name: string | null;
  submission_id: string | null;
  submission_date: string | null;
  files: Files[];
  additional_information: Content;
  operation_location: OperationLocation;
  email: string | null;
  pop: Pop;
  POC: POC;
  phone: string | null;
}

export interface Operation extends OperationData {
  Name: string | null;
  Description: string | null;
  Cage: string | null;
  Naics: string | null;
  PSC: string | null;
  Last_Update: string | null;
  dba_name: string | null;
  physical_address: Address;
  mailing_address: Address;
  POC: POC;
  vendors: { UEI: string }[];
  phone: string;
  fax_number: string;
  url: string;
  other_known_entity: string[];
  subcontractors: Subcontractor[];
}

export interface Conflicts {
  type: string | null;
  details: string | null;
}

export interface DeconflictionData {
  active: boolean | null;
  id: string | null;
  submission_id: string | null;
  conflict_info: Conflicts[];
  concerns: Conflicts[];
  connected_organization: string[];
}
