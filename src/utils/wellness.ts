import { Recruit } from './types';

export interface WellnessAverages {
  military: number;
  family: number;
  physical: number;
  medical: number;
  mental: number;
  experience: number;
  tobacco: number;
  alcohol: number;
  work_experience: number;
}

export interface WellnessAnalysis {
  byUIC: Record<number, WellnessAverages>;
  overall: WellnessAverages;
}

export function calculateWellnessAverages(recruits: Recruit[]): WellnessAnalysis {
  // Initialize the result object
  const result: WellnessAnalysis = {
    byUIC: {},
    overall: {
      military: 0,
      family: 0,
      physical: 0,
      medical: 0,
      mental: 0,
      experience: 0,
      tobacco: 0,
      alcohol: 0,
      work_experience: 0
    }
  };

  // Group recruits by UIC
  const recruitsByUIC: Record<number, Recruit[]> = {};
  recruits.forEach(recruit => {
    if (!recruitsByUIC[recruit.uic]) {
      recruitsByUIC[recruit.uic] = [];
    }
    recruitsByUIC[recruit.uic].push(recruit);
  });

  // Calculate averages for each UIC
  Object.entries(recruitsByUIC).forEach(([uic, uicRecruits]) => {
    const uicNumber = parseInt(uic);
    result.byUIC[uicNumber] = calculateAverages(uicRecruits);
  });

  // Calculate overall averages
  result.overall = calculateAverages(recruits);

  return result;
}

function calculateAverages(recruits: Recruit[]): WellnessAverages {
  const total = {
    military: 0,
    family: 0,
    physical: 0,
    medical: 0,
    mental: 0,
    experience: 0,
    tobacco: 0,
    alcohol: 0,
    work_experience: 0
  };

  recruits.forEach(recruit => {
    Object.entries(recruit.overall_wellness).forEach(([key, value]) => {
      total[key as keyof WellnessAverages] += value;
    });
  });

  const count = recruits.length;
  return Object.entries(total).reduce((acc, [key, value]) => {
    acc[key as keyof WellnessAverages] = Number((value / count).toFixed(2));
    return acc;
  }, {} as WellnessAverages);
}