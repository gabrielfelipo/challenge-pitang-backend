import { Body, Controller, Post } from '@nestjs/common';
import { ScheduleCitizenDto, scheduleCitizenSchema } from './dtos';
import { ZodValidationPipe } from 'src/helpers/validationPipe';

@Controller('schedules')
export class ScheduleCitizenController {
//   constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  async scheduleCitizen(
    @Body(new ZodValidationPipe(scheduleCitizenSchema)) scheduleCitizenDto: ScheduleCitizenDto,
  ) {
    // return this.agendamentoService.scheduleCitizen(scheduleCitizenDto);
  }
}