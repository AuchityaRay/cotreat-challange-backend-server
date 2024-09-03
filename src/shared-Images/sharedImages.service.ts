import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { SharedImage } from './sharedImage.entity';

@Injectable()
export class SharedImagesService {
  constructor(
    @InjectRepository(SharedImage)
    private sharedImageRepository: Repository<SharedImage>,
  ) {}

  async createSharedImage(user: User, imageTitle: string, imageUrl: string): Promise<SharedImage> {
    const sharedImage = this.sharedImageRepository.create({
      user,
      imageTitle,
      imageUrl,
    });
    return this.sharedImageRepository.save(sharedImage);
  }
   // New method to fetch all shared images
   async findAll(): Promise<SharedImage[]> {
    return this.sharedImageRepository.find({ relations: ['user'] });
  }
}
