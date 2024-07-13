import { Body, Controller, Post } from '@nestjs/common';
import { ScheduleCitizenExamDto, scheduleCitizenExamSchema } from './dtos';

import { ZodValidationPipe } from 'src/utils/validation-pipe';
import { ScheduleCitizenExamUseCase } from './useCases/schedule-citizen-exam';

@Controller('schedules')
export class ScheduleCitizenController {
  constructor(private readonly scheduleCitizenExamUseCase: ScheduleCitizenExamUseCase) {}

  @Post()
  async scheduleCitizen(
    @Body(new ZodValidationPipe(scheduleCitizenExamSchema)) scheduleCitizenExamDto: ScheduleCitizenExamDto,
  ) {
    return this.scheduleCitizenExamUseCase.execute(scheduleCitizenExamDto);
  }
}