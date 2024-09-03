import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  private readonly whitelist = ['127.0.0.1']; // Example whitelist

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    return this.whitelist.includes(clientIp);
  }
}
