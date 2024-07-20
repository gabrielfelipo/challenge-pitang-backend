import { ScheduleCitizenExamUseCase } from '../useCases/schedule-citizen-exam'
import { ScheduleCitizenExamDto } from '../dtos'
import { ScheduleRepository } from '../repositories/schedule.repository'
import { CitizenRepository } from 'src/modules/citizen/repositories/citizen.repository'
import { LimitReachedError } from 'src/modules/common/errors/limit-reached-error'

describe('ScheduleCitizenExamUseCase', () => {
  let useCase: ScheduleCitizenExamUseCase
  let scheduleRepository: ScheduleRepository
  let citizenRepository: CitizenRepository

  beforeEach(() => {
    scheduleRepository = {} as jest.Mocked<ScheduleRepository>
    citizenRepository = {} as jest.Mocked<CitizenRepository>
    useCase = new ScheduleCitizenExamUseCase(
      scheduleRepository,
      citizenRepository
    )
  })

  it('should throw LimitReachedError if schedule limit is reached', async () => {
    scheduleRepository.countSchedules = jest.fn().mockResolvedValue(2)

    const payload: ScheduleCitizenExamDto = {
      name: 'John Doe',
      birthDate: '1990-01-01', 
      date: '2024-07-20', 
      hour: '10:00',
    }

    await expect(useCase.execute(payload)).rejects.toThrow(LimitReachedError)
  })

})
