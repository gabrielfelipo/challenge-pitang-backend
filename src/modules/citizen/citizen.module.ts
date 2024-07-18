import { Module } from '@nestjs/common'
import { CitizenController } from './citizen.controller'
import { CreateCitizenUseCase } from './useCases/create-citizen'
import { PrismaModule } from '../common/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [CitizenController],
  providers: [CreateCitizenUseCase],
})
export class CitizenModule {}
