
export type Feature = {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
};

export type FeatureSlide = {
  agent: string;
  role: string;
  title: string;
  features: Feature[];
};
