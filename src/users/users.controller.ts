import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string[] {
    return ['user1', 'user2', 'user3']
  }
  
  @Get('interns')
  findAllInterns(): string[] {
    return ['intern1', 'intern2', 'intern3']
  }

  @Get(':id')
  findOne(@Param('id') id: string)  {
    return 'user:' + id
  }


  @Post()
  create(@Body() user: {name: string}){
    return 'This action adds a new username' + user.name
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() user: {name: string}){
    return {
      id,
      ...user
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return 'This action removes a user' + id
  }
}
