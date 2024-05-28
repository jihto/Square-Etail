import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[ 
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",  
        secure: false,
        auth: {
          user: "pnjihto123@gmail.com",
          pass: "ykjoyqljaxpsriib",
        },
      },
      defaults: {
        from: "Square-Etail pnjihto123@gmail.com",
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
