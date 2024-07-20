import { Entity } from 'src/modules/common/entities/entity'
import { Schedule } from 'src/modules/schedule/entities/Schedule'

type CitizenProps = {
  name: string
  birthDate: Date
  schedule?: Schedule
}

export class Citizen extends Entity<CitizenProps> {
  declare props: CitizenProps

  get name(): string {
    return this.props.name
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  get schedule(): Schedule | undefined {
    return this.props.schedule
  }

  get _serialized() {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      schedule: this.schedule ? this.schedule._serialized : undefined,
    }
  }

  static create(props: CitizenProps, id?: string) {
    const citizen = new Citizen(props, id)

    return citizen
  }
}
