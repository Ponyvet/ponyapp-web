export const MedicationCategory = ['VACCINE', 'ANTIBIOTIC', 'OTHER'] as const
export type MedicationCategoryType = (typeof MedicationCategory)[number]

export const Species = ['DOG', 'CAT'] as const
export type SpeciesType = (typeof Species)[number]
