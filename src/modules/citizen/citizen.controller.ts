import { Body, Controller, Post } from '@nestjs/common'
import {
  CreateCitizenDto,
  createCitizenSchema,
} from './dtos/create-citizen.dto'
import { ZodValidationPipe } from 'src/utils/validation-pipe'
import { CreateCitizenUseCase } from './useCases/create-citizen'

@Controller('citizens')
export class CitizenController {
  constructor(private createCitizenUseCase: CreateCitizenUseCase) {}

  @Post()
  async createCitizen(
    @Body(new ZodValidationPipe(createCitizenSchema))
    createCitizenDto: CreateCitizenDto
  ) {
    return await this.createCitizenUseCase.execute(createCitizenDto)
  }
}
