import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SharedImage } from 'src/shared-Images/sharedImage.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Post('login')
  async login(@Body('username') username: string): Promise<{ userId: string,  access_token: string  }> {
    const user = await this.userService.findOrCreate(username);
    // 
    return this.authService.login(user);  
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
  async getUserFavorites(
    @Param('userId') userId: string,
  ): Promise<SharedImage[]> {
    return this.userService.getUserFavorites(userId);
  }
}
