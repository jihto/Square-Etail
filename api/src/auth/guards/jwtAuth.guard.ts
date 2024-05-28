import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_AUTH_KEY } from 'src/common/decorators/auth.decorator'; 

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) { super(); }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); 
        try {
            const skipAuth = await this.reflector.get<boolean>(SKIP_AUTH_KEY, context.getHandler()); 
            if (skipAuth) {
                return true; 
            }
            const token = await this.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException();
            }  
            const payload = await this.jwtService.verifyAsync(token, { secret: `${process.env.TOKEN_SECRET}` })  
            console.log(payload)  
            request['user'] = payload;
            return true;
        } catch (err) { 
            console.log(err.message)
            if (err instanceof TokenExpiredError) { 
                throw new UnauthorizedException('Token expired');
            } else {
                console.error('Error during authentication:', err);
                throw new UnauthorizedException('Authentication failed');
            }
        }
    } 
    private extractTokenFromHeader(request): string | null {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            return authHeader.split(' ')[1];
        }
        return null;
    }
}