import { Prisma, Citizen as CitizenRaw } from "@prisma/client";
import { Schedule } from "src/modules/schedule/entities/Schedule";
import { nullsToUndefined } from "src/utils/nulls-to-undefined";
import {SetOptional} from "type-fest";
import { CitizenMapper } from "./citizen.mapper";

export class ScheduleMapper {
    static toDomain(
        raw_: SetOptional<
        Prisma.ScheduleGetPayload<{include: {citizen: true} }>,
        "citizen"> 
    ): Schedule 
    {
        const raw = nullsToUndefined(raw_)
        
        return Schedule.create({
            date: raw.date,
            hour: raw.hour, 
            citizenId: raw.citizenId,
            citizen: raw.citizen ? CitizenMapper.toDomain(raw.citizen) : undefined,
            status: raw.status,
            conclusion: raw.conclusion
        },
        raw.id
    )
    }

    static toPersistence(schedule: Schedule): Prisma.ScheduleUncheckedCreateInput{
        return {
            id: schedule.id,
            date: schedule.date,
            hour: schedule.hour,
            citizenId: schedule.citizenId
        }
    }
}