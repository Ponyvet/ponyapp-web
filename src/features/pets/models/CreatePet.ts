import z from 'zod'
import { Sex, Species } from '../utils/enum'

export const createPetSchema = z.object({
  species: z.enum(Species),
  sex: z.enum(Sex),
  recordId: z.string().nonempty('Debe existir una cartilla médica'),
  breed: z.string().optional(),
  birthDate: z.date().optional(),
  color: z.string().optional(),
  notes: z.string().optional(),
})

export type CreatePet = z.infer<typeof createPetSchema>
