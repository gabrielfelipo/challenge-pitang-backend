import { Module } from '@nestjs/common'
import { ScheduleCitizenController } from './schedule.controller'
import { PrismaService } from '../common/prisma/prisma.service'
import { ScheduleCitizenExamUseCase } from './useCases/schedule-citizen-exam'
import { PrismaModule } from '../common/prisma/prisma.module'
import { ListSchedulesUseCase } from './useCases/list-schedules'

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleCitizenController],
  providers: [ScheduleCitizenExamUseCase, ListSchedulesUseCase, PrismaService],
})
export class ScheduleModule {}
