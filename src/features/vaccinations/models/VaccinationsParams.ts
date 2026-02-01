import z from 'zod'

export const vaccinationsParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  petId: z.string().optional(),
  medicalRecordId: z.string().optional(),
  sortBy: z
    .enum(['appliedAt', 'nextDueDate', 'status', 'createdAt', 'updatedAt'])
    .default('appliedAt')
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type VaccinationsParams = z.infer<typeof vaccinationsParamsSchema>
