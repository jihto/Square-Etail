import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service'; 
import { SkipAuth } from 'src/common/decorators/auth.decorator'; 
import * as _ from 'lodash'; 
import { DataUserCommentDto } from './dtos/DataUserComment.dto'; 
import { UpdateUserDto } from './dtos/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import StripeService from './stripe.service';
import { CreateChargeDto } from './dtos/createCharge.dto';
import { RequestUser } from './requestUser.interface';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,  
        private readonly stripeService: StripeService
    ){}

    @Post('charge') 
    async createCharge(@Body() charge: CreateChargeDto): Promise<HttpException>{
        return await this.userService.makeAnPayment(charge);
    }

    @SkipAuth()
    @Post('create/payment') 
    async paymentIntent (@Body() data: {email: string, name: string}) {
        return await this.stripeService.createCustomer(data.name, data.email); 
    }

    @SkipAuth()
    @Post('create-payment-intent') 
    async createPaymentId() {
        return await this.stripeService.payment(); 
    }

    @Post('views/:id')
    async viewProduct(
        @Param('id') productId: string,
        @Request() request: any,
    ): Promise<HttpException>  {    
        return await this.userService.viewProduct(request.user._id, productId);
    }

    @Post('')
    getDataUserComment(
        @Body('usersId') usersId: Array<string>,
    ): Promise<DataUserCommentDto[]>{ 
        return this.userService.getUsersByIds(usersId);
    }

    @Get('')
    information(
        @Request() request: any,
    )  {   
        return this.userService.getUser();
    }

    @HttpCode(HttpStatus.OK)
    @Patch('update')
    async updateInformation(
        @Request() request: any,
        @Body('updateUserDto') updateUserDto: UpdateUserDto
    ): Promise<any>{ 
        return await this.userService.updateInformation(request.user?._id, updateUserDto); 
    }

    @Post('upload/avatar')
    @UseInterceptors(FileInterceptor('avatar')) 
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Request() request: any
    ): Promise<string>{ 
        const url = process.env.DOMAIN + file.path; 
        return await this.userService.updateAvatar(request.user._id, url);
    }

    @Post('change-password')
    async verifyPassword(
        @Request() request: any,
        @Body() password: string
    ): Promise<HttpException>{ 
        return await this.userService.chagePassword(request.user?._id, password);
    }

    @SkipAuth()
    @Post('update-password/:token')
    async updatePassword( 
        @Body() newPassword: string,
        @Param('token') token: string,
    ){ 
        return await this.userService.chagePassword(token, newPassword);
    }

    @HttpCode(HttpStatus.OK)
    @SkipAuth()
    @Get('verify/:token')
    verifyEmail(  
        @Param('token') token: string,
    ): Promise<HttpException> { 
        return  this.userService.verifyEmail(token);
    }
}
