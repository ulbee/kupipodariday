import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @Optional()
  @Length(2, 200)
  about: string;

  @Optional()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
