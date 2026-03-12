// CDT Code Catalog — Top dental procedures
// Code, Name, Default Fee (cents), Duration (minutes), Category

export interface Procedure {
  code: string;
  name: string;
  feeCents: number;
  durationMinutes: number;
  category: string;
}

export const PROCEDURES: Procedure[] = [
  // Diagnostic
  { code: 'D0120', name: 'Periodic Oral Evaluation', feeCents: 6500, durationMinutes: 15, category: 'diagnostic' },
  { code: 'D0150', name: 'Comprehensive Oral Evaluation', feeCents: 9500, durationMinutes: 30, category: 'diagnostic' },
  { code: 'D0210', name: 'Full Mouth X-Rays', feeCents: 15000, durationMinutes: 20, category: 'diagnostic' },
  { code: 'D0274', name: 'Bitewing X-Rays (4 films)', feeCents: 7500, durationMinutes: 10, category: 'diagnostic' },
  { code: 'D0330', name: 'Panoramic X-Ray', feeCents: 13000, durationMinutes: 10, category: 'diagnostic' },

  // Preventive
  { code: 'D1110', name: 'Adult Prophylaxis (Cleaning)', feeCents: 12000, durationMinutes: 45, category: 'preventive' },
  { code: 'D1206', name: 'Fluoride Varnish', feeCents: 4000, durationMinutes: 10, category: 'preventive' },
  { code: 'D1351', name: 'Dental Sealant (per tooth)', feeCents: 5500, durationMinutes: 15, category: 'preventive' },
  { code: 'D4341', name: 'Scaling & Root Planing (per quadrant)', feeCents: 28000, durationMinutes: 60, category: 'preventive' },
  { code: 'D4910', name: 'Periodontal Maintenance', feeCents: 17000, durationMinutes: 45, category: 'preventive' },

  // Restorative
  { code: 'D2140', name: 'Amalgam Filling (1 surface)', feeCents: 18000, durationMinutes: 30, category: 'restorative' },
  { code: 'D2150', name: 'Amalgam Filling (2 surfaces)', feeCents: 23000, durationMinutes: 40, category: 'restorative' },
  { code: 'D2330', name: 'Composite Filling (1 surface, anterior)', feeCents: 20000, durationMinutes: 30, category: 'restorative' },
  { code: 'D2331', name: 'Composite Filling (2 surfaces, anterior)', feeCents: 25000, durationMinutes: 40, category: 'restorative' },
  { code: 'D2391', name: 'Composite Filling (1 surface, posterior)', feeCents: 22000, durationMinutes: 30, category: 'restorative' },
  { code: 'D2392', name: 'Composite Filling (2 surfaces, posterior)', feeCents: 28000, durationMinutes: 40, category: 'restorative' },
  { code: 'D2740', name: 'Porcelain Crown', feeCents: 135000, durationMinutes: 90, category: 'restorative' },
  { code: 'D2750', name: 'Crown (Porcelain Fused to Metal)', feeCents: 120000, durationMinutes: 90, category: 'restorative' },
  { code: 'D2950', name: 'Core Build-Up', feeCents: 35000, durationMinutes: 30, category: 'restorative' },
  { code: 'D2954', name: 'Post & Core (Prefabricated)', feeCents: 40000, durationMinutes: 30, category: 'restorative' },

  // Endodontics
  { code: 'D3310', name: 'Root Canal (Anterior)', feeCents: 85000, durationMinutes: 60, category: 'endodontic' },
  { code: 'D3320', name: 'Root Canal (Premolar)', feeCents: 95000, durationMinutes: 75, category: 'endodontic' },
  { code: 'D3330', name: 'Root Canal (Molar)', feeCents: 115000, durationMinutes: 90, category: 'endodontic' },

  // Periodontics
  { code: 'D4210', name: 'Gingivectomy (per quadrant)', feeCents: 45000, durationMinutes: 60, category: 'periodontic' },
  { code: 'D4240', name: 'Gingival Flap Surgery (per quadrant)', feeCents: 65000, durationMinutes: 90, category: 'periodontic' },
  { code: 'D4260', name: 'Osseous Surgery (per quadrant)', feeCents: 85000, durationMinutes: 120, category: 'periodontic' },

  // Prosthodontics
  { code: 'D5110', name: 'Complete Denture (Upper)', feeCents: 180000, durationMinutes: 120, category: 'prosthodontic' },
  { code: 'D5120', name: 'Complete Denture (Lower)', feeCents: 180000, durationMinutes: 120, category: 'prosthodontic' },
  { code: 'D6240', name: 'Bridge Pontic (Porcelain Fused to Metal)', feeCents: 120000, durationMinutes: 90, category: 'prosthodontic' },

  // Oral Surgery
  { code: 'D7140', name: 'Extraction (Simple)', feeCents: 22000, durationMinutes: 30, category: 'oral_surgery' },
  { code: 'D7210', name: 'Extraction (Surgical)', feeCents: 35000, durationMinutes: 45, category: 'oral_surgery' },
  { code: 'D7220', name: 'Impacted Tooth Removal (Soft Tissue)', feeCents: 40000, durationMinutes: 60, category: 'oral_surgery' },
  { code: 'D7230', name: 'Impacted Tooth Removal (Partial Bony)', feeCents: 50000, durationMinutes: 60, category: 'oral_surgery' },
  { code: 'D7240', name: 'Impacted Tooth Removal (Full Bony)', feeCents: 60000, durationMinutes: 75, category: 'oral_surgery' },

  // Implants
  { code: 'D6010', name: 'Implant (Endosteal)', feeCents: 250000, durationMinutes: 120, category: 'implant' },
  { code: 'D6056', name: 'Implant Abutment (Custom)', feeCents: 80000, durationMinutes: 45, category: 'implant' },
  { code: 'D6058', name: 'Implant Crown (Porcelain)', feeCents: 150000, durationMinutes: 60, category: 'implant' },

  // Orthodontics
  { code: 'D8080', name: 'Comprehensive Orthodontic Treatment', feeCents: 550000, durationMinutes: 60, category: 'orthodontic' },
  { code: 'D8090', name: 'Comprehensive Orthodontic (Adult)', feeCents: 600000, durationMinutes: 60, category: 'orthodontic' },

  // Cosmetic
  { code: 'D2962', name: 'Veneer (Porcelain)', feeCents: 130000, durationMinutes: 90, category: 'cosmetic' },
  { code: 'D9972', name: 'External Tooth Whitening', feeCents: 50000, durationMinutes: 60, category: 'cosmetic' },
];

export function getProceduresByCategory(category: string): Procedure[] {
  return PROCEDURES.filter((p) => p.category === category);
}

export function getProcedureByCode(code: string): Procedure | undefined {
  return PROCEDURES.find((p) => p.code === code);
}

export const PROCEDURE_CATEGORIES = [
  'diagnostic',
  'preventive',
  'restorative',
  'endodontic',
  'periodontic',
  'prosthodontic',
  'oral_surgery',
  'implant',
  'orthodontic',
  'cosmetic',
] as const;
