import { IsEmail, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
