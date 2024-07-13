
import { Schedule } from "src/modules/schedule/entities/Schedule";
import { PrismaService } from "../prisma.service";

import { ScheduleRepository } from "src/modules/schedule/repositories/schedule.repository";
import { ScheduleMapper } from "../mappers/schedule.mapper";
import { Injectable } from "@nestjs/common";
import { Citizen } from "src/modules/citizen/entities/Citizen";

@Injectable()
export class PrismaScheduleRepository extends ScheduleRepository{
    constructor(private readonly prisma: PrismaService){
        super();
    }

    async create(schedule: Schedule): Promise<Schedule> {
        const newSchedule = await this.prisma.schedule.create({
            data: ScheduleMapper.toPersistence(schedule),
            include: {citizen: true}
        })

        return ScheduleMapper.toDomain(newSchedule)
    }

    async findById(id: string): Promise<Schedule | null> {
        const schedule = await this.prisma.schedule.findUnique({
            where: {id}
        })

        if(!schedule) return null

        return ScheduleMapper.toDomain(schedule)
    }

    async countSchedules(date: Date, hour: Date): Promise<number> {
        const count = await this.prisma.schedule.count({
            where: {date, hour}
        })

        return count
    }
    
}