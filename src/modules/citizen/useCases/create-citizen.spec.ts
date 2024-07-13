// import { CreateCitizenUseCase } from './create-citizen-use-case';
// import { CitizenRepositoryInMemory } from '../repositories/citizen.repositoryInMemory';
// import dayjs from 'dayjs';

// let createCitizenUseCase: CreateCitizenUseCase;
// let citizenRepositoryInMemory: CitizenRepositoryInMemory;

// describe('Create Citizen', () => {
//   beforeEach(() => {
//     citizenRepositoryInMemory = new CitizenRepositoryInMemory();
//     createCitizenUseCase = new CreateCitizenUseCase(citizenRepositoryInMemory);
//   });

//   it('Should be able to create citizen', async () => {
//     expect(citizenRepositoryInMemory.citizens).toEqual([]);

//     const citizen = await createCitizenUseCase.execute({
//       name: 'Gabriel Felipo',
//       birthDate: dayjs("2001-07-05", "YYYY-MM-DD").toDate(),
//     });

//     expect(citizenRepositoryInMemory.citizens).toEqual([citizen]);
//   });
// });