import z from 'zod'

export const createClientSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  phone: z
    .string()
    .nonempty('El teléfono es obligatorio')
    .refine((val) => {
      const phoneRegex = /^\d{10}$/
      return phoneRegex.test(val)
    }, 'El número de teléfono debe ser de 10 dígitos'),
  address: z.string().nonempty('La dirección es obligatoria'),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional(),
})

export type CreateClient = z.infer<typeof createClientSchema>
