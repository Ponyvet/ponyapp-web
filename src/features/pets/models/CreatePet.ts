import z from 'zod'
import { Sex, Species } from '../utils/enum'

export const createPetSchema = z.object({
  name: z.string().nonempty(),
  species: z.enum(Species),
  sex: z.enum(Sex),
  clientId: z.string().nonempty('Debe seleccionar un cliente'),
  breed: z.string().optional(),
  birthDate: z.date().optional(),
  color: z.string().optional(),
  notes: z.string().optional(),
})

export type CreatePet = z.infer<typeof createPetSchema>
