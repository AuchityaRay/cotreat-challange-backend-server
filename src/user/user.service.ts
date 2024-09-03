import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SharedImage } from 'src/shared-Images/sharedImage.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SharedImage) 
    private sharedImageRepository: Repository<SharedImage>,
  ) {}

  async findOrCreate(username: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      user = this.userRepository.create({ username });
      await this.userRepository.save(user);
    }

    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id: userId },
      relations: ['favorites'],  });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

async addFavorite(userId: string, imageId: string): Promise<User> {
    const user = await this.findById(userId);
    const image = await this.sharedImageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }

    user.favorites.push(image);
    await this.userRepository.save(user);

    return user;
  }

  async removeFavorite(userId: string, imageId: string): Promise<User> {
    const user = await this.findById(userId);
    const imageIndex = user.favorites.findIndex(image => image.id === imageId);

    if (imageIndex === -1) {
      throw new NotFoundException(`Image with id ${imageId} not found in user's favorites`);
    }

    user.favorites.splice(imageIndex, 1);
    await this.userRepository.save(user);

    return user;
  }

  async getUserFavorites(userId: string): Promise<SharedImage[]> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user.favorites;
  }
}
