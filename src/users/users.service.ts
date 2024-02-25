import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'user1',
      role: 'admin',
      email: 'h1@dd.com',
    },
    {
      id: 2,
      name: 'user2',
      role: 'intern',
      email: 'h2@dd.com',
    },
    {
      id: 3,
      name: 'user3',
      role: 'engineer',
      email: 'h3@dd.com',
    },
    {
      id: 4,
      name: 'user4',
      role: 'engineer',
      email: 'h4@dd.com',
    },
  ]
  findAll(role?: 'admin' | 'intern' | 'engineer') {
    if (role) {
      return this.users.filter((user) => user.role === role)
    }
    return this.users
  }

  findOne(id) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  create(user: CreateUserDto) {
    const u = {
      id: this.users.length + 1,
      ...user,
    }
    this.users.push(u)
    return u
  }

  update(id: string, user: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === +id)
    this.users[index] = {
      ...this.users[index],
      ...user,
    }

    return this.users[index]
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== +id)
    return this.users
  }
}
