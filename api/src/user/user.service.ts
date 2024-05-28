import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/user.model'; 
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { PayloadDto } from 'src/auth/types/payload.interface';
import { DataUserResponseDto } from 'src/auth/dtos/dataUserResponse.dto';
import { DataUserCommentDto } from './dtos/DataUserComment.dto';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import CreateChargeDto from './dtos/createCharge.dto';
import StripeService from './stripe.service';
@Injectable()
export class UserService {

    constructor( 
        @InjectModel('User') private readonly UserModel:Model<IUser>,
        private readonly jwtService: JwtService,  
        private readonly sendMail: MailService, 
        private readonly httpService: HttpService,
        private readonly stripeService: StripeService
    ) {} 
    async getUser() {
        try {
            const isUser = await this.UserModel.find({}); 
            return isUser;
        } catch (error) {
            return null;
        }
    }

    private async updateViewsFromDjango(userId: string, productId: string): Promise<Observable<any>> {
        try { 
            const url = `http://127.0.0.1:8000/product/views/${userId}/${productId}`; 
            const response = await this.httpService
                .put(url, {})
                .toPromise();  
            return response.data.message; 
        }catch(error){
            console.error('Error:', error.response.data);
            throw error.response.data.error; 
        }
    }

    viewProduct = async(userId: string, productId: string): Promise<HttpException> => {  
        try {
            const response = await this.updateViewsFromDjango(userId, productId); 
            console.log(response);
            return new HttpException(response, HttpStatus.OK);   
        } catch (error) { 
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    getUsersByIds = async(userIdArray: string[]): Promise<DataUserCommentDto[]> => { 
        try { 
            const users = await this.UserModel.find({ _id: { $in: userIdArray } }).select("name avatar").lean();
            return users.map(user => new DataUserCommentDto(user));
        } catch (error) {
            console.error('Error retrieving users:', error);
            throw error; // You can handle or rethrow the error as needed
        }
    }

    updateInformation = async(id : string , updateUserDto: Record<string, any>): Promise<DataUserResponseDto> => { 
        try {
            console.log({ updateUserDto });
            const user = await this.UserModel.findById(id); 
            const updatedFields = { ...updateUserDto };
            Object.keys(updatedFields).forEach(key => {
                if (updatedFields[key] === null || updatedFields[key] === undefined) {
                    delete updatedFields[key];
                }
            }); 
            Object.assign(user, updatedFields);
            const update = await user.save();
            console.log({ updatedFields });
            if(!update) 
                throw new  HttpException("Not Found",HttpStatus.NOT_FOUND);  
            const result = await this.UserModel.findOne({ _id: id }).lean();
            return new DataUserResponseDto(result);
        } catch (error) { 
            throw new HttpException(error.message,HttpStatus.BAD_GATEWAY);
        }
    }

    updateAvatar = async(_id: string, avatar: string): Promise<string> =>{
        try {
            const user = await this.UserModel.findOneAndUpdate({ _id }, { $set: { avatar } })
            return avatar;
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_GATEWAY);
        }
    }

    async chagePassword(userId: string, password: string):Promise<HttpException>{
        try {
            const user = await this.UserModel.findById(userId); 
            const isPassword = await bcrypt.compare(password, user.password); 
            if(!isPassword)
                throw new  HttpException("Password not correct",HttpStatus.BAD_REQUEST); 
            await this.sendMail.sendChangePassword(user.email)
            return new HttpException("We send new change password to your email", HttpStatus.OK); 
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_GATEWAY); 
        }
    }

    async updatePassword(token: string, newPassword: string){
        try {
            const dataToken: PayloadDto = await this.jwtService.verifyAsync(token, { secret: `${process.env.TOKEN_SECRET}` })  
            const hashPassword: string = await bcrypt.hash(newPassword, 10);   
            const updatePassword = await this.UserModel.updateOne({ _id: dataToken._id}, { $set: {password: hashPassword} });
            if(!updatePassword)
                throw new HttpException("Update password Fail ", HttpStatus.BAD_GATEWAY);
            return new HttpException("Update password success", HttpStatus.OK);
        } catch (error) {
            return new HttpException("Update password Fail", HttpStatus.BAD_GATEWAY);
        }
    }

    async verifyEmail(token: string): Promise<HttpException> { 
        try {
            const dataToken = await this.jwtService.verifyAsync(token, { secret: `${process.env.TOKEN_SECRET}` })   
            if(dataToken?.iat < dataToken?.exp){
                const isUser = await this.UserModel.findOneAndUpdate({_id: dataToken._id}, {$set: {isVerify: true}}); 
                return new HttpException("Verify successfull", HttpStatus.OK);
            } 
            throw new HttpException("Token exprires", HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
    }


    async makeAnPayment(charge: CreateChargeDto) {
        try {
            const response: any = await this.stripeService.charge(charge.amount, charge.paymentMethodId, "cus_Q8d1ObiIDHJzSN");
            if(response){
                return new HttpException( response.client_secret, HttpStatus.OK)
            }
        } catch (error) {
            console.log(error.message);
            return new HttpException("Payment Fail", HttpStatus.BAD_GATEWAY)
        }
    }
}
