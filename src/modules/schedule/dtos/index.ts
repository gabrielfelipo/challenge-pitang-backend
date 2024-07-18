// import dayjs from 'dayjs';
import { z } from 'zod'

export const scheduleCitizenExamSchema = z.object({
  name: z.string().min(4, 'Name is too short'),
  birthDate: z.string(),
  date: z.string(),
  hour: z.string(),
})

export type ScheduleCitizenExamDto = z.infer<typeof scheduleCitizenExamSchema>
