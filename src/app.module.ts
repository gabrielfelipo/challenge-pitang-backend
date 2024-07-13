import { Module } from '@nestjs/common';
import { CitizenModule } from './modules/citizen/citizen.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { PrismaService } from './modules/common/prisma/prisma.service';
import { PrismaModule } from './modules/common/prisma/prisma.module';


@Module({
  imports: [ScheduleModule, CitizenModule, PrismaModule],
})
export class AppModule {}