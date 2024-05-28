import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service'; 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {   
        const user = await this.authService.validateUser(username);  
        if (!user) {
            throw new HttpException("Email wasn't exist", HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}