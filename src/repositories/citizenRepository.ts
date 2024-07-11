import { Injectable } from "@nestjs/common";
import { Citizen, Prisma } from "@prisma/client";
import { PrismaService } from "prisma/client";

@Injectable()
export class CitizenRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.CitizenCreateInput): Promise<Citizen> {
        return this.prisma.citizen.create({
          data,
        })
    }
    
    async findById(id: number): Promise<Citizen> | null {
        return this.prisma.citizen.findUnique({
            where: {id}
        })
    }
}