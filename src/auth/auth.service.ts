import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      userId: user.id, // Returning userId
      access_token: this.jwtService.sign(payload), // Generating JWT token
    };
  }
}
