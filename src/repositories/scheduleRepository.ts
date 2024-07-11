import { Prisma, Schedule } from "@prisma/client";
import { PrismaService } from "prisma/client";


export class ScheduleRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
        return this.prisma.schedule.create({
          data,
        })
    }
    
    async findAll(skip: number, take: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            skip,
            take,
            include: {citizen: true}
        })
    }

    
}