import z from 'zod'
import { UserRoles } from '../utils/enum'

export const createUserSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  email: z.email('El correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(UserRoles, 'El rol es obligatorio'),
  clientId: z.string().nullish(),
})

export type CreateUser = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  email: z.email('El correo electrónico no es válido'),
  password: z.string().optional(),
  role: z.enum(UserRoles),
  clientId: z.string().nullish(),
  isActive: z.boolean().optional(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
