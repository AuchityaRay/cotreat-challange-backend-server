import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';  // Import UserService if needed

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,  // Inject the user service
  ) {}

  @Post('login')
  async login(@Body('username') username: string) {
    // Check if the user exists or create a new user
    const user = await this.userService.findOrCreate(username);
    
    // Return the JWT token and userId
    return this.authService.login(user);
  }
}
