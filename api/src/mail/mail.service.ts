import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor( 
        private readonly mailerService: MailerService, 
    ) {} 

    sendVerify = async(token: string, email: string) => {
        const link = `http://localhost:3000/user/verify/${token}`;
        await this.mailerService
            .sendMail({
                to: email, 
                subject: 'Email Verification ✔', 
                html:  `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
                <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
                <hr>
                <h4>Hi ,</h4>
                <p>
                    Please verify your email address so we can know that it's really you.
                    <br>
                <p>This link <b>expires in 1 hour</b></p>
                <br>
                <a href=${link}
                    style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify
                    Email Address</a>
                </p>
                <div style="margin-top: 20px;">
                    <h5>Best Regards</h5>
                    <h5>Square Etail</h5>
                </div>
            </div>`, 
            }) 
    }


    sendChangePassword = async(email: string) => {
        const link = `http://localhost:3000/user/update-password}`;
        await this.mailerService
            .sendMail({
                to: email, 
                subject: 'Email Change Password ✔', 
                html:  `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
                <h3 style="color: rgb(8, 56, 188)">Please update new your password</h3>
                <hr>
                <h4>Hi ,</h4>
                <p>
                    Please change new password so we can know that it's really you.
                    <br>
                <p>This link <b>expires in 1 hour</b></p>
                <br>
                <form method="POST" action=${link}}> 
                    <input type="text" name="password" placeholder="..."/><br/>
                    <button style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;" type""Submit>Submit</button>
                </form>
                <div style="margin-top: 20px;">
                    <h5>Best Regards</h5>
                    <h5>Square Etail</h5>
                </div>
            </div>`, 
            }) 
    }
}
