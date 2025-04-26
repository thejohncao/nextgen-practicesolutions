
export interface Agent {
  name: string;
  title: string;
  tagline: string;
  color: 'blue' | 'green' | 'purple' | 'red' | 'gold';
  features: string[];
  quote?: string;  // Make quote optional with '?'
  description?: string;  // I notice description is also not in the original type
  icon?: React.ComponentType;  // If icon is a React component
  activities?: string[];
  tools?: {
    name: string;
    icon: React.ComponentType;
    description: string;
  }[];
}

