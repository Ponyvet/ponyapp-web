import z from 'zod'

export const createConsultationSchema = z.object({
  reason: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  notes: z.string().optional(),
  recordId: z.string().nonempty('La cartilla es obligatoria'),
})

export type CreateConsultation = z.infer<typeof createConsultationSchema>
