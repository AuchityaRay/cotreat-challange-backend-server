import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SharedImage } from 'src/shared-Images/sharedImage.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('username') username: string): Promise<{ userId: string }> {
    const user = await this.userService.findOrCreate(username);
    return { userId: user.id };
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }

  @Post(':userId/favorites/:imageId')
  async addFavorite(
    @Param('userId') userId: string,
    @Param('imageId') imageId: string,
  ): Promise<User> {
    return this.userService.addFavorite(userId, imageId);
  }

  @Delete(':userId/favorites/:imageId')
  async removeFavorite(
    @Param('userId') userId: string,
    @Param('imageId') imageId: string,
  ): Promise<User> {
    return this.userService.removeFavorite(userId, imageId);
  }

  // get all favorite images of a user
  @Get(':userId/favorites')
  async getUserFavorites(@Param('userId') userId: string): Promise<SharedImage[]> {
    return this.userService.getUserFavorites(userId);
  }
}
