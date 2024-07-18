import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../common/prisma/prisma.service'
import { Citizen } from '../entities/Citizen'

@Injectable()
export abstract class CitizenRepository {
  static usedAs = 'citizenRepository'

  abstract create(citizen: Citizen): Promise<Citizen>

  abstract findById(id: string): Promise<Citizen | null | undefined>
}
