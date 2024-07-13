import { Injectable } from '@nestjs/common';
import { CitizenRepository } from '../repositories/citizen.repository';
import { Citizen } from '../entities/Citizen';
import { IUseCase, IUseCaseResponse } from 'src/modules/common/types/use-case';
import { AsyncEither, Right, right } from 'src/modules/common/logic/Either';
import { DomainError } from 'src/modules/common/errors';
import { CreateCitizenDto } from '../dtos/create-citizen.dto';
import dayjs from 'dayjs';


type CreateCitizenResponse = AsyncEither<DomainError, IUseCaseResponse>

@Injectable()
export class CreateCitizenUseCase implements IUseCase {
  constructor(private citizenRepository: CitizenRepository) {}

  async execute(payload: CreateCitizenDto): CreateCitizenResponse {
    const citizen = Citizen.create({
      ...payload, 
      birthDate: dayjs(payload.birthDate).toDate()
    })

    await this.citizenRepository.create(citizen)

    return right({message: "Citizen created successfuly", response: {citizen}});
  }
}