import { Controller, Post, Body, Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SharedImagesService } from './sharedImages.service';

@Controller('shared-images')
export class SharedImagesController {
  constructor(
    private readonly sharedImagesService: SharedImagesService,
    private readonly userService: UserService,
  ) {}

  @Post(':userId')
  async createSharedImage(
    @Param('userId') userId: string,
    @Body('imageTitle') imageTitle: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return this.sharedImagesService.createSharedImage(user, imageTitle, imageUrl);
  }
}
