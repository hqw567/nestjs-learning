import { Body, Controller, Delete, Get, Ip, Param, Patch, Post, Query } from '@nestjs/common'
import { SkipThrottle, Throttle } from '@nestjs/throttler'
import { Prisma } from '@prisma/client'
import { MyLoggerService } from 'src/my-logger/my-logger.service'
import { EmployeesService } from './employees.service'

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name)
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeesCreateInput) {
    return this.employeesService.create(createEmployeeDto)
  }

  @Throttle({
    short: {
      limit: 3,
      ttl: 6000,
    },
  })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    this.logger.log(`Request to get all employees\t${ip}`)
    return this.employeesService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeesUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id)
  }
}
