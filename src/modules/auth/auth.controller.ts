/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { ValidateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto): Promise<any> {
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: ValidateUserDto): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { email, id } = user as { email: string; id: string };
    return this.authService.login({ email, id });
  }
}
