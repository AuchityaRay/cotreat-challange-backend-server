import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreateUser(username: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      user = this.userRepository.create({ username });
      await this.userRepository.save(user);
    }

    return user;
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
