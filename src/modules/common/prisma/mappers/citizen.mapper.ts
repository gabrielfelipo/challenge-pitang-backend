import { Prisma, Citizen as CitizenRaw, Schedule } from '@prisma/client'
import { Citizen } from 'src/modules/citizen/entities/Citizen'
import { nullsToUndefined } from 'src/utils/nulls-to-undefined'
import { SetOptional } from 'type-fest'

export class CitizenMapper {
  static toDomain(
    raw_: SetOptional<
      Prisma.CitizenGetPayload<{ include: { schedule: true } }>,
      'schedule'
    >
  ): Citizen {
    const raw = nullsToUndefined(raw_)

    return Citizen.create({ name: raw.name, birthDate: raw.birthDate }, raw.id)
  }

  static toPersistence(citizen: Citizen): Prisma.CitizenCreateInput {
    return {
      id: citizen.id,
      name: citizen.name,
      birthDate: citizen.birthDate,
    }
  }
}
