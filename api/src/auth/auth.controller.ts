import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { RegisterUserDto } from 'src/auth/dtos/register.dto'; 
import { DataUserResponseDto } from './dtos/dataUserResponse.dto';
import { SignInDto } from './dtos/signIn.dto';
import { SkipAuth } from 'src/common/decorators/auth.decorator';
import { RefreshJwtGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService, 
    ){}

    @UseGuards(LocalAuthGuard)
    @SkipAuth()
    @Post('login')
    login(@Body() dataLogin: SignInDto) : Promise<DataUserResponseDto>  {
        console.log(dataLogin);
        return this.authService.signIn(dataLogin);
    }

    @SkipAuth()
    @Post('login/social')
    loginWithSocial(@Body() dataLogin: RegisterUserDto) : Promise<DataUserResponseDto>  { 
        return this.authService.registerWithSocial(dataLogin);
    }


    @HttpCode(HttpStatus.OK)
    @SkipAuth()
    @Post('register')
    registerUser(@Body(ValidationPipe) createUserDto: RegisterUserDto): Promise<HttpException> {
        return this.authService.signUp(createUserDto)
    }

    @UseGuards(RefreshJwtGuard) 
    @SkipAuth()
    @Post('refresh')
    refrshToken(@Request() req) {
        console.log({user: req.user})
        return this.authService.refreshToken(req.user);
    }  
}
