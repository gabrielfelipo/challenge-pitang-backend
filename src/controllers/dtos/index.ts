import dayjs from 'dayjs'
import { z } from 'zod'

export const scheduleCitizenSchema = z.object(
    {
        name: z.string().min(4,'Name is too short'),
        birthDate: z.string().refine((date) => dayjs(date, 'YYYY-MM-DD', true).isValid(), {
            message: 'Invalid date'
        }),
        date: z.string().refine((date) => dayjs(date, 'YYYY-MM-DD', true).isValid(), {
            message: 'Invalid date'
        }),
        hour: z.string().refine((time) => dayjs(time, 'HH:MM', true).isValid(), {
            message: 'Invalid hour',
        }),
    }
)

export type ScheduleCitizenDto = z.infer<typeof scheduleCitizenSchema>;
