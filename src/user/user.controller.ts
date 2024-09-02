import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

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
}
