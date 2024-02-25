import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}

  create(createEmployeeDto: Prisma.EmployeesCreateInput) {
    const user = this.db.employees.create({ data: createEmployeeDto })
    return user
  }

  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      return this.db.employees.findMany({ where: { role: role } })
    }
    return this.db.employees.findMany()
  }

  findOne(id: number) {
    return this.db.employees.findUnique({ where: { id } })
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeesUpdateInput) {
    return this.db.employees.update({ where: { id }, data: updateEmployeeDto })
  }

  remove(id: number) {
    return this.db.employees.delete({ where: { id } })
  }
}
