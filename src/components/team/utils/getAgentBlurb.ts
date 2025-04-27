
export const getAgentBlurb = (name: string): string => {
  switch (name) {
    case 'Miles':
      return "Keep your schedule full and your front office running effortlessly.";
    case 'Giselle':
      return "Turn leads into loyal, lifelong patients with automated nurturing.";
    case 'Devon':
      return "Boost case acceptance and grow your practice's bottom line.";
    case 'Alma':
      return "Train and empower your team with onboarding, SOPs, and education.";
    default:
      return "";
  }
};
