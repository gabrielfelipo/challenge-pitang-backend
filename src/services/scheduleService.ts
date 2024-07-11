import { Injectable } from '@nestjs/common';
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

    //Numero de agendamentos
    // const count = await this.scheduleRepository.count()
    // if sada return error

    //Horario futuro

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