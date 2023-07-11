import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GOauthService } from './g-oauth/g-oauth.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
config();

@Controller('google')
export class AuthController {

  constructor(
    private readonly gOauthService: GOauthService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req) {
  }

  @Get(process.env.CALLBACK_PATH)
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // sign
    const googleUserInfo = this.gOauthService.googleLogin(req);
    this.userService.sign(googleUserInfo);

    // token
    const access_token = await this.authService.generateAccessToken(googleUserInfo);
    const refreshToken = await this.authService.generateRefreshToken(googleUserInfo);
    
    this.userService.sign({ ...googleUserInfo, refreshToken: refreshToken });

    return access_token;
  }
}
