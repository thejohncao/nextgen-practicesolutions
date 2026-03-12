// Common dental diagnoses organized by relevance to tooth type

export interface Diagnosis {
  code: string;
  name: string;
  description: string;
  toothTypes: ('anterior' | 'premolar' | 'molar' | 'any')[];
  suggestedCategories: string[];
}

export const DIAGNOSES: Diagnosis[] = [
  // Decay / Caries
  {
    code: 'K02.9',
    name: 'Dental Caries',
    description: 'Tooth decay requiring restoration',
    toothTypes: ['any'],
    suggestedCategories: ['restorative'],
  },
  {
    code: 'K02.52',
    name: 'Caries on Pit & Fissure',
    description: 'Decay in the grooves of the tooth',
    toothTypes: ['premolar', 'molar'],
    suggestedCategories: ['restorative'],
  },
  {
    code: 'K02.51',
    name: 'Caries on Smooth Surface',
    description: 'Decay on the flat surface of the tooth',
    toothTypes: ['anterior', 'premolar'],
    suggestedCategories: ['restorative'],
  },

  // Fracture / Damage
  {
    code: 'S02.5',
    name: 'Fractured Tooth',
    description: 'Tooth with crack or fracture',
    toothTypes: ['any'],
    suggestedCategories: ['restorative'],
  },
  {
    code: 'K03.1',
    name: 'Abrasion of Tooth',
    description: 'Worn tooth surface from mechanical action',
    toothTypes: ['any'],
    suggestedCategories: ['restorative', 'cosmetic'],
  },

  // Pulp / Nerve
  {
    code: 'K04.0',
    name: 'Pulpitis (Reversible)',
    description: 'Inflamed tooth nerve, may recover',
    toothTypes: ['any'],
    suggestedCategories: ['restorative'],
  },
  {
    code: 'K04.01',
    name: 'Pulpitis (Irreversible)',
    description: 'Nerve damage requiring root canal',
    toothTypes: ['any'],
    suggestedCategories: ['endodontic'],
  },
  {
    code: 'K04.1',
    name: 'Necrotic Pulp',
    description: 'Dead tooth nerve',
    toothTypes: ['any'],
    suggestedCategories: ['endodontic', 'oral_surgery'],
  },
  {
    code: 'K04.7',
    name: 'Periapical Abscess',
    description: 'Infection at the root tip',
    toothTypes: ['any'],
    suggestedCategories: ['endodontic', 'oral_surgery'],
  },

  // Periodontal
  {
    code: 'K05.1',
    name: 'Chronic Gingivitis',
    description: 'Gum inflammation',
    toothTypes: ['any'],
    suggestedCategories: ['preventive', 'periodontic'],
  },
  {
    code: 'K05.31',
    name: 'Chronic Periodontitis (Localized)',
    description: 'Bone loss around specific teeth',
    toothTypes: ['any'],
    suggestedCategories: ['periodontic'],
  },
  {
    code: 'K05.311',
    name: 'Chronic Periodontitis (Generalized)',
    description: 'Widespread bone loss',
    toothTypes: ['any'],
    suggestedCategories: ['periodontic'],
  },

  // Missing / Edentulous
  {
    code: 'K08.1',
    name: 'Missing Tooth (Extraction)',
    description: 'Tooth previously extracted',
    toothTypes: ['any'],
    suggestedCategories: ['implant', 'prosthodontic'],
  },
  {
    code: 'K08.0',
    name: 'Exfoliation of Tooth',
    description: 'Tooth lost due to disease',
    toothTypes: ['any'],
    suggestedCategories: ['implant', 'prosthodontic'],
  },

  // Impaction
  {
    code: 'K01.1',
    name: 'Impacted Tooth',
    description: 'Tooth stuck in bone or soft tissue',
    toothTypes: ['molar'],
    suggestedCategories: ['oral_surgery'],
  },

  // Cosmetic
  {
    code: 'K00.8',
    name: 'Discolored Tooth',
    description: 'Staining or discoloration',
    toothTypes: ['anterior'],
    suggestedCategories: ['cosmetic', 'restorative'],
  },
  {
    code: 'K00.2',
    name: 'Malformed Tooth',
    description: 'Abnormal tooth shape or size',
    toothTypes: ['anterior'],
    suggestedCategories: ['cosmetic', 'restorative'],
  },
  {
    code: 'M26.3',
    name: 'Malocclusion',
    description: 'Misalignment of teeth/bite',
    toothTypes: ['any'],
    suggestedCategories: ['orthodontic'],
  },
];

export type ToothType = 'anterior' | 'premolar' | 'molar';

export function getToothType(toothNumber: number): ToothType {
  // Universal numbering: 1-32
  // Anterior: 6-11 (upper), 22-27 (lower)
  // Premolar: 4-5, 12-13 (upper), 20-21, 28-29 (lower)
  // Molar: 1-3, 14-16 (upper), 17-19, 30-32 (lower)
  const anteriorTeeth = [6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27];
  const premolarTeeth = [4, 5, 12, 13, 20, 21, 28, 29];

  if (anteriorTeeth.includes(toothNumber)) return 'anterior';
  if (premolarTeeth.includes(toothNumber)) return 'premolar';
  return 'molar';
}

export function getDiagnosesForTooth(toothNumber: number): Diagnosis[] {
  const toothType = getToothType(toothNumber);
  return DIAGNOSES.filter(
    (d) => d.toothTypes.includes('any') || d.toothTypes.includes(toothType)
  );
}
