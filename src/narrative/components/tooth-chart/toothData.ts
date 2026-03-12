// Tooth metadata for the 32-tooth universal numbering system

export interface ToothInfo {
  number: number;
  name: string;
  type: 'molar' | 'premolar' | 'anterior';
  arch: 'upper' | 'lower';
  quadrant: 1 | 2 | 3 | 4;
}

// Universal numbering: 1-16 upper (right to left), 17-32 lower (left to right)
export const TEETH: ToothInfo[] = [
  // Upper arch (right to left from patient perspective)
  { number: 1, name: 'Upper Right 3rd Molar', type: 'molar', arch: 'upper', quadrant: 1 },
  { number: 2, name: 'Upper Right 2nd Molar', type: 'molar', arch: 'upper', quadrant: 1 },
  { number: 3, name: 'Upper Right 1st Molar', type: 'molar', arch: 'upper', quadrant: 1 },
  { number: 4, name: 'Upper Right 2nd Premolar', type: 'premolar', arch: 'upper', quadrant: 1 },
  { number: 5, name: 'Upper Right 1st Premolar', type: 'premolar', arch: 'upper', quadrant: 1 },
  { number: 6, name: 'Upper Right Canine', type: 'anterior', arch: 'upper', quadrant: 1 },
  { number: 7, name: 'Upper Right Lateral Incisor', type: 'anterior', arch: 'upper', quadrant: 1 },
  { number: 8, name: 'Upper Right Central Incisor', type: 'anterior', arch: 'upper', quadrant: 1 },
  { number: 9, name: 'Upper Left Central Incisor', type: 'anterior', arch: 'upper', quadrant: 2 },
  { number: 10, name: 'Upper Left Lateral Incisor', type: 'anterior', arch: 'upper', quadrant: 2 },
  { number: 11, name: 'Upper Left Canine', type: 'anterior', arch: 'upper', quadrant: 2 },
  { number: 12, name: 'Upper Left 1st Premolar', type: 'premolar', arch: 'upper', quadrant: 2 },
  { number: 13, name: 'Upper Left 2nd Premolar', type: 'premolar', arch: 'upper', quadrant: 2 },
  { number: 14, name: 'Upper Left 1st Molar', type: 'molar', arch: 'upper', quadrant: 2 },
  { number: 15, name: 'Upper Left 2nd Molar', type: 'molar', arch: 'upper', quadrant: 2 },
  { number: 16, name: 'Upper Left 3rd Molar', type: 'molar', arch: 'upper', quadrant: 2 },
  // Lower arch (left to right from patient perspective)
  { number: 17, name: 'Lower Left 3rd Molar', type: 'molar', arch: 'lower', quadrant: 3 },
  { number: 18, name: 'Lower Left 2nd Molar', type: 'molar', arch: 'lower', quadrant: 3 },
  { number: 19, name: 'Lower Left 1st Molar', type: 'molar', arch: 'lower', quadrant: 3 },
  { number: 20, name: 'Lower Left 2nd Premolar', type: 'premolar', arch: 'lower', quadrant: 3 },
  { number: 21, name: 'Lower Left 1st Premolar', type: 'premolar', arch: 'lower', quadrant: 3 },
  { number: 22, name: 'Lower Left Canine', type: 'anterior', arch: 'lower', quadrant: 3 },
  { number: 23, name: 'Lower Left Lateral Incisor', type: 'anterior', arch: 'lower', quadrant: 3 },
  { number: 24, name: 'Lower Left Central Incisor', type: 'anterior', arch: 'lower', quadrant: 3 },
  { number: 25, name: 'Lower Right Central Incisor', type: 'anterior', arch: 'lower', quadrant: 4 },
  { number: 26, name: 'Lower Right Lateral Incisor', type: 'anterior', arch: 'lower', quadrant: 4 },
  { number: 27, name: 'Lower Right Canine', type: 'anterior', arch: 'lower', quadrant: 4 },
  { number: 28, name: 'Lower Right 1st Premolar', type: 'premolar', arch: 'lower', quadrant: 4 },
  { number: 29, name: 'Lower Right 2nd Premolar', type: 'premolar', arch: 'lower', quadrant: 4 },
  { number: 30, name: 'Lower Right 1st Molar', type: 'molar', arch: 'lower', quadrant: 4 },
  { number: 31, name: 'Lower Right 2nd Molar', type: 'molar', arch: 'lower', quadrant: 4 },
  { number: 32, name: 'Lower Right 3rd Molar', type: 'molar', arch: 'lower', quadrant: 4 },
];

export const UPPER_TEETH = TEETH.filter((t) => t.arch === 'upper');
export const LOWER_TEETH = TEETH.filter((t) => t.arch === 'lower');

export function getToothInfo(number: number): ToothInfo | undefined {
  return TEETH.find((t) => t.number === number);
}
