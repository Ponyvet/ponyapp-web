import z from 'zod'
import { MedicalRecordTypes } from '../utils/enum'

export const createMedicalRecordSchema = z.object({
  type: z.enum(MedicalRecordTypes),
  name: z.string().nonempty('El nombre es obligatorio'),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional(),
  clientId: z.string().nonempty('El cliente es obligatorio'),
})

export type CreateMedicalRecord = z.infer<typeof createMedicalRecordSchema>
