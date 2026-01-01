import z from 'zod'

export const simpleUserSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type SimpleUser = z.infer<typeof simpleUserSchema>
