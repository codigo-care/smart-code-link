
export interface CodeData {
  id: string;
  code: string;
  matched: boolean;
}

export interface MatchData {
  icd: string;
  cpt: string;
}

// Demo data with H-series ICD codes and one ICD with multiple matches
export const demoData = {
  icdCodes: [
    { id: "icd-1", code: "H40.1132", matched: true },   // Matched to two CPT codes
    { id: "icd-2", code: "H25.13", matched: false },    // Cataract
    { id: "icd-3", code: "H35.352", matched: true },    // Macular degeneration
    { id: "icd-4", code: "H53.2", matched: true },      // Diplopia
    { id: "icd-5", code: "H57.9", matched: false }      // Unspecified disorder of eye
  ],
  cptCodes: [
    { id: "cpt-1", code: "92134", matched: true },     // OCT imaging
    { id: "cpt-2", code: "99214", matched: false },    // Office visit
    { id: "cpt-3", code: "67036", matched: true },     // Vitrectomy
    { id: "cpt-4", code: "92020", matched: true },     // Gonioscopy
    { id: "cpt-5", code: "92015", matched: true }      // Refraction
  ],
  matches: [
    { icd: "icd-1", cpt: "cpt-1" },  // H40.1132 -> 92134
    { icd: "icd-1", cpt: "cpt-4" },  // H40.1132 -> 92020 (second match)
    { icd: "icd-3", cpt: "cpt-3" },  // H35.352 -> 67036
    { icd: "icd-4", cpt: "cpt-5" }   // H53.2 -> 92015
  ]
};
