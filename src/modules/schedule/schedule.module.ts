import { Module } from '@nestjs/common';
import { ScheduleCitizenController } from './schedule.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import { ScheduleCitizenExamUseCase } from './useCases/schedule-citizen-exam';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleCitizenController],
  providers: [ScheduleCitizenExamUseCase, PrismaService],
})
export class ScheduleModule {}