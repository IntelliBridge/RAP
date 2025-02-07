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

export interface Vendor {
  id: string | null;
  Name: string | null;
  Description: string | null;
  Cage: string | null;
  Naics: string | null; // Changed to match the input object
  PSC: string | null;
  Last_Update: string | null; // Changed to match the input object
  dba_name: string | null;
  physical_address: Address;
  mailing_address: Address;
  POC: POC;
}

export interface OverviewJsonData {
  UEI: string | null;
  registration_dates: registrationDates;
  entity_dates: entityDates;
  transactions_over_time: TransactionsOverTime;
}

export interface registrationDates {
  activation_date: string | null;
  submission_date: string | null;
  initial_registration_date: string | null;
}

export interface entityDates {
  entity_start_date: string | null;
  fiscal_year_end_close_date: string | null;
}

export interface TransactionsOverTime {
  [key: `FY${number}`]: OverviewChartData;
}

export interface OverviewChartData {
  all_transactions: string | null;
  new_awards: string | null;
}

export interface TransactionsData {
  [year: string]: {
    all_transactions: string | null;
    new_awards: string | null;
  };
}
