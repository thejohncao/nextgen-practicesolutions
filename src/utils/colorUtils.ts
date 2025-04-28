
// Get background color class for cards based on agent
export const getAgentCardColor = (color: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-50/5';
    case 'green': return 'bg-green-50/5';
    case 'purple': return 'bg-purple-50/5';
    case 'gold': return 'bg-amber-50/5';
    default: return 'bg-white/5';
  }
};

// Get border color class for cards based on agent
export const getAgentBorderColor = (color: string) => {
  switch (color) {
    case 'blue': return 'border-blue-200/10';
    case 'green': return 'border-green-200/10';
    case 'purple': return 'border-purple-200/10'; 
    case 'gold': return 'border-amber-200/10';
    default: return 'border-white/10';
  }
};
