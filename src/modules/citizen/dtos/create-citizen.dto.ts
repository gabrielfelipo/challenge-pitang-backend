import { z } from 'zod'

export const createCitizenSchema = z.object({
  name: z.string().min(4, 'Name is too short'),
  birthDate: z.string(),
})

export type CreateCitizenDto = z.infer<typeof createCitizenSchema>
