export interface Recruit {
    id: string;
    first_name: string;
    middle_initial: string;
    last_name: string;
    rank: string;
    gender: string;
    address: string;
    address_2: string;
    city: string;
    state: string;
    zip: number;
    email: string;
    phone: number;
    dob: string;
    uic: number;
    overall_wellness: {
      military: number;
      family: number;
      physical: number;
      medical: number;
      mental: number;
      experience: number;
      tobacco: number;
      alcohol: number;
      work_experience: number;
    };
    survey: {
      [key: string]: {
        [key: string]: string;
      };
    };
  }