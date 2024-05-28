import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Request, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dtos/cart.interface';
import { ProductDto } from './dtos/product.interface';
import { ProductInTheCartDto } from './dtos/productInTheCart.interface';
import { SkipAuth } from 'src/common/decorators/auth.decorator';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService, 
    ){}


    // @Get('')
    // async getCart(
    //     
    // ): Promise<CartDto> {   
    //     return this.cartService.userCart(request.user._id);
    // }

    @Get("")
    async getProducts(
        @Request() request: any
    ): Promise<CartDto> {
        return await this.cartService.userCart(request.user._id);
    }


    @Post("/")
    async changeItemsInTheCart(
        @Request() request: any,
        @Body('productId') productId: string,
    ): Promise<HttpException> {
        console.log(request.user.cartId)
        const message: string = await this.cartService.changeCart(request.user.cartId, productId);
        throw new HttpException(message, HttpStatus.OK)
    }

    @Post("/deleted")
    async removeItemsInTheCart(
        @Request() req,  
        @Body('productId') productId: string,
    ): Promise<HttpException> {
        const message: string = await this.cartService.removeIitem(req.user.cartId, productId);
        throw new HttpException(message, HttpStatus.OK)
    }

    @SkipAuth()
    @Put("update/:cartId")
    async updateCart(
        @Param('cartId') cartId: string,
        @Body('products') products: ProductInTheCartDto[],
    ): Promise<HttpException>{ 
        const message: string = await this.cartService.updateAll(cartId, products);
        throw new HttpException(message, HttpStatus.OK); 
    }
}
