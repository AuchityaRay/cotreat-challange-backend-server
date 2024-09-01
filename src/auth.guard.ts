import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['authorization'] || request.query.userId;

    if (!userId) {
      return false;
    }

    const user = await this.userService.findById(userId);
    return !!user;
  }
}
