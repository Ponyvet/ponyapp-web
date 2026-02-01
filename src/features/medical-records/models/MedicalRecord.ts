import { clientSchema } from '@/features/clients/models/Client'
import { petSchema } from '@/features/pets/models/Pet'
import { animalGroupSchema } from './AnimalGroup'
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
    address: true,
  }),
  pet: petSchema
    .pick({
      id: true,
      species: true,
      sex: true,
      breed: true,
      birthDate: true,
      color: true,
      notes: true,
    })
    .nullable(),
  animalGroup: animalGroupSchema
    .pick({
      id: true,
      animalType: true,
      quantity: true,
      notes: true,
    })
    .nullable(),
})

export type MedicalRecord = z.infer<typeof medicalRecordSchema>
