import { Citizen } from "src/modules/citizen/entities/Citizen";
import { CitizenRepository } from "src/modules/citizen/repositories/citizen.repository";
import { PrismaService } from "../prisma.service";
import { CitizenMapper } from "../mappers/citizen.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaCitizenRepository extends CitizenRepository{
    constructor(private readonly prisma: PrismaService){
        super();
    }


    async create(citizen: Citizen): Promise<Citizen> {
        await this.prisma.citizen.create({
          data: CitizenMapper.toPersistence(citizen),
        })

        return citizen
    }

    
    async findById(id: string): Promise<Citizen | null | undefined> {
        const citizen = await this.prisma.citizen.findUnique({
            where: {id}
        })

        if(!citizen) return null

        return CitizenMapper.toDomain(citizen)
    }
    
}