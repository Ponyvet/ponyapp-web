import { z } from 'zod'

export const medicalRecordParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  clientId: z.string().optional(),
})

export type MedicalRecordParams = z.infer<typeof medicalRecordParamsSchema>
