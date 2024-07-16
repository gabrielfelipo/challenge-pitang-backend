import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleCitizenExamDto, scheduleCitizenExamSchema } from './dtos';

import { ZodValidationPipe } from 'src/utils/validation-pipe';
import { ScheduleCitizenExamUseCase } from './useCases/schedule-citizen-exam';
import { ListSchedulesUseCase } from './useCases/list-schedules';

@Controller('schedules')
export class ScheduleCitizenController {
  constructor(
    private readonly scheduleCitizenExamUseCase: ScheduleCitizenExamUseCase, 
    private readonly listSchedulesUseCase: ListSchedulesUseCase
  ) {}

  @Post()
  async scheduleCitizen(
    @Body(new ZodValidationPipe(scheduleCitizenExamSchema)) scheduleCitizenExamDto: ScheduleCitizenExamDto,
  ) {
    return this.scheduleCitizenExamUseCase.execute(scheduleCitizenExamDto);
  }

  @Get()
  async listSchedules() {
    return this.listSchedulesUseCase.execute();
  }

  
}