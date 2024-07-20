import { Schedule } from 'src/modules/schedule/entities/Schedule'
import { PrismaService } from '../prisma.service'

import { ScheduleRepository } from 'src/modules/schedule/repositories/schedule.repository'
import { ScheduleMapper } from '../mappers/schedule.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaScheduleRepository extends ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(schedule: Schedule): Promise<Schedule> {
    const newSchedule = await this.prisma.schedule.create({
      data: ScheduleMapper.toPersistence(schedule),
      include: { citizen: true },
    })

    return ScheduleMapper.toDomain(newSchedule)
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    })

    if (!schedule) return null

    return ScheduleMapper.toDomain(schedule)
  }

  async countSchedules(date: string, hour: string): Promise<number> {
    const count = await this.prisma.schedule.count({
      where: { date, hour },
    })

    return count
  }

  async findAll(skip: number, take: number): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      skip: skip,
      take: take,
      include: { citizen: true },
      orderBy: [{ date: 'asc' }, { hour: 'asc' }],
    })

    return schedules.map(ScheduleMapper.toDomain)
  }
}
