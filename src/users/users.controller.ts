import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'admin' | 'intern' | 'engineer') {
    return this.usersService.findAll(role)
  }

  @Get('interns')
  findAllInterns(): string[] {
    return ['intern1', 'intern2', 'intern3']
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) user: UpdateUserDto) {
    return this.usersService.update(id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
