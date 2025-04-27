
export const getAvatarGradient = (color: string = 'purple'): string => {
  switch(color) {
    case 'red': return 'from-red-500 to-red-600';
    case 'green': return 'from-green-500 to-green-600';
    case 'blue': return 'from-blue-500 to-blue-600';
    case 'purple': return 'from-purple-500 to-purple-600';
    case 'gold': return 'from-amber-500 to-amber-600';
    default: return 'from-purple-500 to-purple-600';
  }
};
