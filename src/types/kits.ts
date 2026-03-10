
export interface Kit {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  kit_type: 'Launch' | 'Training' | 'Marketing' | 'Compliance' | 'Technology';
  version: string | null;
  support_contact: string | null;
  featured: boolean | null;
  order_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface KitFile {
  id: string;
  kit_id: string | null;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: string | null;
  description?: string | null;
  order_number: number | null;
  created_at: string;
}

export interface KitSOP {
  id: string;
  kit_id: string | null;
  title: string;
  content: string | null;
  order_number: number | null;
  created_at: string;
}

export interface KitVideo {
  id: string;
  kit_id: string | null;
  title: string;
  video_url: string;
  description: string | null;
  order_number: number | null;
  created_at: string;
}
