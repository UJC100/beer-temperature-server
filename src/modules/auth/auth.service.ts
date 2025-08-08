/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: ValidateUserDto): Promise<any> {
    const user = await this.userService.findUserByEmail(payload.email);
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: { email: string; id: string }) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(payload: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(payload);
    const userArg = {
      email: user.email,
      id: user._id.toString(),
    };
    return this.login(userArg);
  }
}
