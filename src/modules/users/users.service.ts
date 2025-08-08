import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import * as bcypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    const { email, password } = payload;
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcypt.hash(password, 10);
    payload.password = hashedPassword;
    const createdUser = await this.userModel.create(payload);
    return createdUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
