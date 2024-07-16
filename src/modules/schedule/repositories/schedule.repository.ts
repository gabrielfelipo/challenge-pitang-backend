import { Injectable } from "@nestjs/common";
import { Schedule } from "../entities/Schedule";

@Injectable()
export abstract class ScheduleRepository{

    abstract create(schedule: Schedule): Promise<Schedule>

    abstract findById(id: string): Promise<Schedule | null>

    abstract countSchedules(date: Date, hour: Date): Promise<number>

    abstract findAll(skip: number, take: number): Promise<Schedule[]>
}
