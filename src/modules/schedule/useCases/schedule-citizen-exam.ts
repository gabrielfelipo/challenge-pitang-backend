import { Injectable } from '@nestjs/common'
import { IUseCase, IUseCaseResponse } from 'src/modules/common/types/use-case'
import {
  AsyncEither,
  Right,
  left,
  right,
} from 'src/modules/common/logic/Either'
import { DomainError } from 'src/modules/common/errors'
import dayjs from 'dayjs'
import { ScheduleCitizenExamDto } from '../dtos'
import { CitizenRepository } from 'src/modules/citizen/repositories/citizen.repository'
import { Citizen } from 'src/modules/citizen/entities/Citizen'
import { Schedule } from '../entities/Schedule'
import { ScheduleRepository } from '../repositories/schedule.repository'
import { LimitReachedError } from 'src/modules/common/errors/limit-reached-error'
import { UnauthorizedError } from 'src/modules/common/errors/unauthoraized-error'

type ScheduleCitizenExamResponse = AsyncEither<DomainError, IUseCaseResponse>

@Injectable()
export class ScheduleCitizenExamUseCase implements IUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private citizenRepository: CitizenRepository
  ) {}

  async execute(payload: ScheduleCitizenExamDto): ScheduleCitizenExamResponse {
    const count = await this.scheduleRepository.countSchedules(
      payload.date,
      payload.hour
    )

    if (count > 1) {
      throw new LimitReachedError('Limited reached on Date/Hour')
    }

    if (dayjs(payload.date).isBefore(dayjs(), 'day')) {
      return left(new UnauthorizedError('Unauthorized date/hour'))
    }

    const citizen = Citizen.create({
      ...payload,
      birthDate: dayjs(payload.birthDate).toDate(),
    })

    await this.citizenRepository.create(citizen)

    const rawSchedule = Schedule.create({
      ...payload,
      citizenId: citizen.id,
    })

    const schedule = await this.scheduleRepository.create(rawSchedule)

    console.log(schedule)

    return right({
      message: 'Created Schedule and Citizen successfuly',
      response: { schedule: schedule._serialized },
    })
  }
}
