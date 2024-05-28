import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: `${process.env.TOKEN_SECRET}`,
        });
    }

    async validate(payload: any) {
        console.log({payload})
        return { user: payload.sub, username: payload.username };
    }
}