import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CitizenRepository } from 'src/modules/citizen/repositories/citizen.repository';
import { PrismaCitizenRepository } from './repositories/prisma-citizen.repository';
import { ScheduleRepository } from 'src/modules/schedule/repositories/schedule.repository';
import { PrismaScheduleRepository } from './repositories/prisma-schedule.repository';

@Module({
  providers: [
    PrismaService,
    {provide: CitizenRepository, useClass: PrismaCitizenRepository},
    {provide: ScheduleRepository, useClass: PrismaScheduleRepository}
  ],
  exports: [CitizenRepository, ScheduleRepository]

})
export class PrismaModule {}