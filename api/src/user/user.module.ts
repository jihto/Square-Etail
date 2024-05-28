import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from 'src/common/middleware/storage.middlware';
import StripeService from './stripe.service';

@Module({
  imports:[
    MongooseModule.forFeature([ User]),
    JwtModule.register({}), 
    MailModule,
    HttpModule,
    MulterModule.register({ storage: storage }),
  ],
  controllers: [UserController],
  providers: [UserService, StripeService]
})
export class UserModule {}
