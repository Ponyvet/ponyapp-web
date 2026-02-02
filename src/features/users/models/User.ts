import z from 'zod'
import { UserRoles } from '../utils/enum'
import { clientSchema } from '@/features/clients/models/Client'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(UserRoles),
  clientId: z.string().nullish(),
  isActive: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  client: clientSchema
    .pick({
      id: true,
      name: true,
    })
    .nullish(),
})

export type User = z.infer<typeof userSchema>
