import { Injectable } from '@nestjs/common';
import { IUseCase, IUseCaseResponse } from 'src/modules/common/types/use-case';
import { AsyncEither, Right, left, right } from 'src/modules/common/logic/Either';
import { DomainError } from 'src/modules/common/errors';
import dayjs from 'dayjs';
import { ScheduleCitizenExamDto } from '../dtos';
import { CitizenRepository } from 'src/modules/citizen/repositories/citizen.repository';
import { Citizen } from 'src/modules/citizen/entities/Citizen';
import { Schedule } from '../entities/Schedule';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { LimitReachedError } from 'src/modules/common/errors/limit-reached-error';
import { UnauthorizedError } from 'src/modules/common/errors/unauthoraized-error';
import { NotFoundError } from 'rxjs';
import { NoneElementError } from 'src/modules/common/errors/not-found-error';


type ListSchedulesResponse = AsyncEither<DomainError, IUseCaseResponse>

@Injectable()
export class ListSchedulesUseCase implements IUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(): ListSchedulesResponse {

    const rawSchedules = await this.scheduleRepository.findAll(0,100);

    if (rawSchedules == null) {
        return left(new NoneElementError("No schedules found"));
    }

    const schedules: Schedule[] = []
    for (var schedule of rawSchedules){
        schedules.push(schedule._serialized)
    }

    return right({ 
        message: "Schedules founded" ,
        response: {schedules: schedules}
    });
  }
}
