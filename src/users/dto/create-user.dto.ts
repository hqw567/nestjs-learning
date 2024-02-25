import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

type Role = 'admin' | 'intern' | 'engineer'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(['admin', 'intern', 'engineer'], {
    message: 'role must be one of the following values: admin, intern, engineer',
  })
  role: Role

  @IsEmail()
  email: string
}
