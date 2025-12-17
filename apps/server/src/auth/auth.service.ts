import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async exchangeCode(code: string, redirectUri?: string): Promise<any> {
    const clientId = this.configService.get<string>(
      'DISCORD_CLIENT_ID',
    )!;
    const clientSecret = this.configService.get<string>(
      'DISCORD_CLIENT_SECRET',
    )!;
    // Use provided redirectUri or fall back to env variable
    const finalRedirectUri =
      redirectUri ||
      this.configService.get<string>('DISCORD_REDIRECT_URI')!;

    try {
      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', finalRedirectUri);

      const response = await axios.post(
        'https://discord.com/api/oauth2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error: any) {
      console.error(
        'Error exchanging code:',
        error.response?.data || error.message,
      );
      throw new UnauthorizedException('Failed to exchange code');
    }
  }

  async getDiscordUser(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching user:',
        error.response?.data || error.message,
      );
      throw new UnauthorizedException('Failed to fetch user info');
    }
  }

  async login(discordUser: any) {
    const payload = {
      username: discordUser.username,
      sub: discordUser.id,
      avatar: discordUser.avatar,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: discordUser,
    };
  }
}
