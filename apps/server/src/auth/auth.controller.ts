import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('discord')
  async discordLogin(
    @Body('code') code: string,
    @Body('redirect_uri') redirectUri: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!code) {
      throw new UnauthorizedException('No code provided');
    }

    // 1. Exchange code for access token (use redirect_uri from client)
    const tokenData = await this.authService.exchangeCode(
      code,
      redirectUri,
    );

    // 2. Get user info from Discord
    const discordUser = await this.authService.getDiscordUser(
      tokenData.access_token,
    );

    // 3. Login (generate JWT)
    const { access_token, user } =
      await this.authService.login(discordUser);

    // 4. Set Cookie
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // 'lax' allows cookie to be sent on navigation after OAuth redirect
      maxAge: 3600 * 1000 * 24, // 1 day
    });

    return { user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out' };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }
}
