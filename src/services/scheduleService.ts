import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'prisma/client';
import { CitizenRepository } from 'src/repositories/citizenRepository';
import { ScheduleRepository } from 'src/repositories/scheduleRepository';
import { ScheduleCitizenDto } from 'src/controllers/dtos';

@Injectable()
export class ScheduleService {
  constructor(
    private citizenRepository: CitizenRepository,
    private scheduleRepository: ScheduleRepository,
    ) {}

  async scheduleCitizen(data: ScheduleCitizenDto) {
    const { name, birthDate, date, hour } = data

    //reached schedule limit
    const count = await this.scheduleRepository.countSchedules(
      dayjs(date, 'YYYY-MM-DD').toDate(),
      dayjs(hour, 'HH:mm').toDate()
    )

    if (count > 1) {
      throw new ConflictException('Schedule limit reached for this date and hour.');
    }

    // Future date
    if (dayjs(date).isBefore(dayjs(), 'hour')) {
      throw new BadRequestException('This date is in the past.');
    }

    const citizen = await this.citizenRepository.create({
        name,
        birthDate: dayjs(birthDate, "YYYY-MM-DD").toDate()
    })

    const schedule = await this.scheduleRepository.create({
        date: dayjs(date, 'YYYY-MM-DD').toDate(),
        hour: dayjs(hour, 'HH:mm').toDate(), 
        citizen: {connect: {id: citizen.id}},
    });

    return schedule;
  }


}