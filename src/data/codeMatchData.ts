
export interface CodeData {
  id: string;
  code: string;
  description: string;
  matched: boolean;
}

export interface MatchData {
  icd: string;
  cpt: string;
}

// Updated data with real medical codes and descriptions
export const demoData = {
  icdCodes: [
    { 
      id: "icd-1", 
      code: "H25.813", 
      description: "Combined forms of age-related cataract, bilateral", 
      matched: true 
    },
    { 
      id: "icd-2", 
      code: "H35.372", 
      description: "Epiretinal membrane, left eye", 
      matched: true 
    },
    { 
      id: "icd-3", 
      code: "H18.623", 
      description: "Keratoconus, unstable, bilateral", 
      matched: true 
    },
    { 
      id: "icd-4", 
      code: "H40.033", 
      description: "Anatomical narrow angle, bilateral", 
      matched: true 
    },
  ],
  cptCodes: [
    { 
      id: "cpt-1", 
      code: "92136", 
      description: "Optical Biometry", 
      matched: true 
    },
    { 
      id: "cpt-2", 
      code: "92134", 
      description: "OCT Macula", 
      matched: true 
    },
    { 
      id: "cpt-3", 
      code: "92025", 
      description: "Corneal Topography", 
      matched: true 
    },
    { 
      id: "cpt-4", 
      code: "92020", 
      description: "Gonioscopy", 
      matched: true 
    },
  ],
  matches: [
    { icd: "icd-1", cpt: "cpt-1" },  // H25.813 -> 92136
    { icd: "icd-2", cpt: "cpt-2" },  // H35.372 -> 92134
    { icd: "icd-3", cpt: "cpt-3" },  // H18.623 -> 92025
    { icd: "icd-4", cpt: "cpt-4" },  // H40.033 -> 92020
  ]
};
