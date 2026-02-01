import { clientSchema } from '@/features/clients/models/Client'
import z from 'zod'

export const medicalRecordSchema = z.object({
  id: z.string(),
  type: z.enum(['PET', 'GROUP']),
  name: z.string(),
  notes: z.string().nullable(),
  clientId: z.string(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  client: clientSchema.pick({
    id: true,
    name: true,
    phone: true,
  }),
})

export type MedicalRecord = z.infer<typeof medicalRecordSchema>
