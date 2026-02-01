import z from 'zod'

export const createVisitSchema = z.object({
  date: z.coerce.date('La fecha es obligatoria'),
  generalNotes: z.string().optional(),
  veterinarianId: z.string().nonempty('El veterinario es obligatorio'),
  clientId: z.string().nonempty('El cliente es obligatorio'),
})

export type CreateVisit = z.infer<typeof createVisitSchema>
