import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';  
import { Cart } from 'src/schemas/cart.model';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[
    MongooseModule.forFeature([ User, Cart]), 
    JwtModule.register({}), 
    MailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ]
})
export class AuthModule {}
