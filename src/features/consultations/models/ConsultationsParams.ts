import z from 'zod'

export const consultationsParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  medicalRecordId: z.string().optional(),
  sortBy: z
    .enum(['date', 'createdAt', 'updatedAt'])
    .default('date')
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type ConsultationsParams = z.infer<typeof consultationsParamsSchema>
