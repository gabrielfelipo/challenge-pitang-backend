import { randomUUID } from 'node:crypto'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { date } from 'zod';
import dayjs from 'dayjs';

faker.seed(123);

const firstRandom = faker.number.int();

const secondRandom = faker.number.int();

console.log(firstRandom === secondRandom);

const repeatAsync = <T>(times: number, fn: (index: number) => T) => {
    const result: T[] = []
  
    for (const index of [...Array(times).keys()]) {
      result.push(fn(index))
    }
  
    return Promise.all(result)
}

async function prismaSeed() {
    const prisma = new PrismaClient()
   
   const deleteAll = async () => {
    await prisma.schedule.deleteMany()
    await prisma.citizen.deleteMany()
   }
   
   await deleteAll()
   
   try {
    repeatAsync(10, async () => {
        const citizen = await prisma.citizen.create({
            data: {
                name: faker.person.fullName(),
                birthDate: faker.date.birthdate(),
            }
        })
    
        await prisma.schedule.create({
            data: {
                date: new Date(dayjs().add(faker.number.int({min:0, max:6}), 'day').toString()),
                hour: new Date(dayjs().hour(8).minute(0).second(0).millisecond(0).add(faker.number.int({min:0, max:9}), 'hour').toString()),
                citizenId: citizen.id
            }
        })
    })
    
   } catch (e) {
    await deleteAll()
   }

   await prisma.$disconnect()
   
    console.log('Seed is done!')
}

   
prismaSeed()
   