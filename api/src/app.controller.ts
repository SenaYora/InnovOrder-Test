import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { SkipJwt } from './auth/jwt.public.meta';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @SkipJwt()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
