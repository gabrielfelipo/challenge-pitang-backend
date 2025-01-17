import { randomUUID } from 'crypto'
import { Citizen } from 'src/modules/citizen/entities/Citizen'
import { Entity } from 'src/modules/common/entities/entity'
import { date } from 'zod'

type ScheduleProps = {
  date: string
  hour: string
  citizen?: Citizen
  citizenId: string
  status?: string
  conclusion?: string
}

export class Schedule extends Entity<ScheduleProps> {
  declare props: ScheduleProps

  get date(): string {
    return this.props.date
  }

  get hour(): string {
    return this.props.hour
  }

  get citizen(): Citizen | undefined {
    return this.props.citizen
  }

  get citizenId(): string {
    return this.props.citizenId
  }

  get status(): string | undefined {
    return this.props.status
  }

  get conclusion(): string | undefined {
    return this.props.conclusion
  }

  get _serialized() {
    return {
      id: this.id,
      date: this.date,
      hour: this.hour,
      citizen: this.citizen ? this.citizen._serialized : undefined,
      citizenId: this.citizenId,
      status: this.status,
      conclusion: this.conclusion,
    }
  }

  static create(props: ScheduleProps, id?: string) {
    const schedule = new Schedule(props, id)

    return schedule
  }
}
