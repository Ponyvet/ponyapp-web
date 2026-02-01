import type { MedicalRecord } from '../models/MedicalRecord'

export const isPetRecord = (
  record: MedicalRecord,
): record is MedicalRecord & { pet: NonNullable<MedicalRecord['pet']> } => {
  return record.type === 'PET' && record.pet !== null
}

export const isAnimalGroupRecord = (
  record: MedicalRecord,
): record is MedicalRecord & {
  animalGroup: NonNullable<MedicalRecord['animalGroup']>
} => {
  return record.type === 'GROUP' && record.animalGroup !== null
}
