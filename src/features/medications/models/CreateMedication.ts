import z from 'zod'

import { MedicationCategory, Species } from '../utils/enum'

export const createMedicationSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  category: z.enum(MedicationCategory, 'Selecciona una categoría'),
  species: z.enum(Species).optional(),
  defaultIntervalDays: z.coerce.number().int().positive().optional(),
  notes: z.string().max(500).optional(),
})

export type CreateMedication = z.infer<typeof createMedicationSchema>
