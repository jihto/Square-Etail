import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[ 
    MailerModule.forRoot({
      transport: {
        host:  process.env.MAILDEV_HOST,  
        secure: false,
        auth: {
          user: process.env.MAILDEV_USER,
          pass:  process.env.MAILDEV_PASS,
        },
      },
      defaults: {
        from: process.env.MAILDEV_FROM,
      }, 
      template: { 
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
