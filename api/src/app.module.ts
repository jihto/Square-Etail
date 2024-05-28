import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common'; 
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtGuard } from './auth/guards/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';
import * as Joi from '@hapi/joi';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/squareEtail'),
    AuthModule, 
    UserModule,
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(), 
      })
    }), 
    JwtModule.register({}), 
    MailModule, 
    NotificationModule, 
  ], 
  providers: [ 
    JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor , 
    },{ 
      provide: APP_PIPE,
      useClass: ValidationPipe 
    },
  ],
})
export class AppModule {}
