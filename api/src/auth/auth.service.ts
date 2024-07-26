import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/user.model';
import { RegisterUserDto } from 'src/auth/dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { PayloadDto } from './types/payload.interface'; 
import { DataUserResponseDto } from './dtos/dataUserResponse.dto';
import { SignInDto } from './dtos/signIn.dto'; 
import { ICart } from 'src/schemas/cart.model';
import { MailService } from 'src/mail/mail.service';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,   
        @InjectModel('User') private readonly UserModel:Model<IUser>,
        @InjectModel('Cart') private readonly CartModel:Model<ICart>, 
        private readonly sendEmailService: MailService,
        private readonly httpService: HttpService
    ) {} 

    private genrateToken  = async(payload: PayloadDto): Promise<{accessToken: string}> => { 
            const accessToken = await this.jwtService.signAsync(payload, { secret: `${process.env.TOKEN_SECRET}`, expiresIn: '1d' });
            // const refreshToken = await this.jwtService.signAsync(payload, { secret: `${process.env.TOKEN_SECRET}`, expiresIn: '7d' })
        return {
            accessToken,
            // refreshToken
        }
    }   

    private getUser = async(email: string): Promise<null | DataUserResponseDto> => {
        try {
            const isExist = await this.UserModel.findOne({email: email}).lean().exec();  
            if(isExist) 
                return isExist;
            return null;
        } catch (error) {
            return null;
        }
    }
    
    signUp = async (data: RegisterUserDto):Promise<HttpException> => {
        try {  
            const  emailIsExist = await this.getUser(data.email);
            if(emailIsExist) throw new HttpException("Email already exist",HttpStatus.BAD_REQUEST);

            const hashPassword = await bcrypt.hash(data.password, 10);   
            if(!hashPassword)
                throw new HttpException('Password error', HttpStatus.INTERNAL_SERVER_ERROR);
            const cart = await this.CartModel.create({});
            const createUser = new this.UserModel({
                email: data.email,
                name: data.name,
                country: data.country,
                city: data.city,
                password: hashPassword,
                cartId: cart._id,
            });    
            await createUser.save();  
            const payload: PayloadDto = {
                _id: createUser._id.toString(),
                email: data.email,
                name: data.name,
                cartId: createUser.cartId.toString(),
            }
            const { accessToken } = await this.genrateToken(payload);
            const isVerify = await this.sendEmailService.sendVerify(accessToken, data.email);
            return new HttpException(`Register successfull.Please confirm in email`, HttpStatus.OK);
        } catch (error: any ) {
            throw new NotAcceptableException(error.message)
        }
    }

    signIn = async(dataLogin: SignInDto): Promise<DataUserResponseDto> => {
        try{  
            const isUser = await this.getUser(dataLogin.username);
            const isPassword = await bcrypt.compare(dataLogin.password, isUser.password);  
            if(!isPassword) 
                throw new HttpException("Password not correct ", HttpStatus.BAD_REQUEST);

            const payload: PayloadDto = {
                _id: isUser._id.toString(),
                email: isUser.email,
                name: isUser.name,
                cartId: isUser.cartId.toString(),
            }
            if(!isUser?.isVerify)  
                throw new UnauthorizedException("Please verify your account");
            const { accessToken } = await this.genrateToken(payload); 
            const responseData = await this.UserModel.findByIdAndUpdate({_id: isUser._id}, { $set:{ token: accessToken } }).lean().exec();
            return new DataUserResponseDto({...responseData, token: accessToken });
        }catch(error: any) {
            throw new NotAcceptableException(error.message);
        }
    }

    registerWithSocial = async(data: RegisterUserDto):Promise<DataUserResponseDto> => {
        try {
            const { email, name, password, avatar } = data
            const emailIsExist = await this.UserModel.findOne({email: email}).lean();  
            if(emailIsExist) {
                const payload: PayloadDto = {
                    _id: emailIsExist._id.toString(),
                    email,
                    name,
                    cartId: emailIsExist.cartId.toString(),
                } 
                const { accessToken } = await this.genrateToken(payload); 
                return new DataUserResponseDto({...emailIsExist, token: accessToken });
            };
            const hashPassword = await bcrypt.hash(password, 10);   
            if(!hashPassword)
                throw new HttpException('Password error', HttpStatus.INTERNAL_SERVER_ERROR);
            const cart = await new this.CartModel({}); 
            const result = await this.UserModel.create({
                email,
                name,  
                password: hashPassword,
                avatar,
                isVerify: true, 
                cartId: cart._id
            });   
            const payload: PayloadDto = {
                _id: result._id.toString(),
                email,
                name,
                cartId: cart.toString(),
            }
            await cart.save();
            const dataUser = await this.UserModel.findOne({ _id:result._id }).lean();
            const { accessToken } = await this.genrateToken(payload); 
            return new DataUserResponseDto({...dataUser, token: accessToken });
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    async validateUser(email: string) {
        try {
            const isUser = await this.getUser(email); 
            return isUser;
        } catch (error) {
            return null;
        }
    }
    async refreshToken(payload: PayloadDto) {  
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async requestForgetPassword (email: string){
        try {
            const isExist = await this.UserModel.findOne({ email });
            if(!isExist) throw new HttpException("Email wasn't exist", HttpStatus.BAD_REQUEST);
            else{
                const otp: number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                console.log({ otp }); 
                isExist.otp = otp; 
                isExist.save();
                const otpArray: string[] = otp.toString().split("");
                await this.sendEmailService.sendForgetPassword(email, otpArray);
                return new HttpException("Send otp to email success", HttpStatus.OK);
            }
        }catch(error){
            console.log(error.message);
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
    }
    async verifyForgetPassword (email: string, otp: string){ 
        try {  
            const isExist = await this.UserModel.findOne({ email });
            if(!isExist) throw new HttpException("Email wasn't exist", HttpStatus.BAD_REQUEST);
            else{ 
                if(isExist.otp !== Number(otp)) throw new HttpException("Otp not correct", HttpStatus.BAD_REQUEST);
                else{
                    const token: string = await this.jwtService.signAsync({email}, { secret: `${process.env.TOKEN_SECRET}`, expiresIn: '1d' });
                    isExist.otp = 0;
                    isExist.save();
                    return new HttpException(token, HttpStatus.OK);
                }
            }
        }catch(error){ 
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
    }

    async changePassword (token: string, password: string){ 
        try {
            const dataToken = await this.jwtService.verifyAsync(token, { secret: `${process.env.TOKEN_SECRET}` });
            if(dataToken){ 
                if(dataToken.iat > dataToken.exp) throw new HttpException("Token exprires", HttpStatus.BAD_REQUEST);
                const isExist = await this.UserModel.findOne({ email: dataToken.email }).lean();
                if(!isExist) throw new HttpException("Email wasn't exist", HttpStatus.BAD_REQUEST);
                else{ 
                    console.log(password); 
                    const hashPassword = await bcrypt.hash(password, 10);   
                    if(!hashPassword)
                        throw new HttpException('Password error', HttpStatus.INTERNAL_SERVER_ERROR);
                    console.log(password);
                    const update = await this.UserModel.findOneAndUpdate({ email: dataToken.email }, { $set:{ password: hashPassword } });
                    return new HttpException("Change password successfull", HttpStatus.OK);
                }
            }
        }catch(error){ 
            console.log(error.message)
            throw new HttpException(error.messgae, HttpStatus.BAD_GATEWAY);
        }
    }
}