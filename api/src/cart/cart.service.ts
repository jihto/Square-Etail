import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ICart } from 'src/schemas/cart.model';
import { IUser } from 'src/schemas/user.model';
import { CartDto } from './dtos/cart.interface';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';  
import { ProductInTheCartDto } from './dtos/productInTheCart.interface';

@Injectable()
export class CartService {
    constructor( 
        @InjectModel('User') private readonly userModel:Model<IUser>,
        @InjectModel('Cart') private readonly CartModel:Model<ICart>,
        private readonly httpService: HttpService
    ) {} 

    private async getProductsFromDjango(productId: string[]): Promise<Observable<any>> {
        try { 
            const url = 'http://127.0.0.1:8000/products/'; 
            const response = await this.httpService.
                post(url, { productIds: productId })
                .toPromise(); 
            return response.data; 
        }catch(error){
            console.error('Error:', error);
            throw error; 
        }
    }

    async userCart(
        userId:string,
    ): Promise<CartDto> {
        try {
            const dataUser = await this.userModel.findOne({_id : userId}).select("cartId").lean();
            if(!dataUser) throw new  NotFoundException(`Not found id ${userId} `);
            const cartUser = await this.CartModel.findById({ _id: dataUser.cartId }).lean(true).exec();
            const query: string[] = await cartUser.products.map((item: any)=>  item.product.toString() );  
            const dataProducts: Observable<any> = await this.getProductsFromDjango(query); //call get data from Django 
            let totalPrice: number = 0;
            let totalQuantity: number = 0
            for (let key in dataProducts) {
                cartUser.products[key].product = dataProducts[key];
                totalPrice += parseFloat(dataProducts[key].price) * cartUser.products[key].count;
                totalQuantity += cartUser.products[key].count;
            } 
            cartUser.quantity = totalQuantity;
            cartUser.totalPrice = totalPrice;
            return new CartDto(cartUser);   
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    async changeCart(
        cartId:string,
        productId: string
    ): Promise<string> {
        try {
            const cartData = await this.CartModel.findById( cartId ).lean(true).exec();
            if(!cartData) throw new NotFoundException(`Not found cart ID`);     
            const existingProductIndex = cartData.products.findIndex((p: { product: string }) =>  p.product === productId );
            if (existingProductIndex !== -1) {
                // If the product exists in the cart, update its fields
                cartData.products[existingProductIndex].count += 1;
                await this.CartModel.findByIdAndUpdate(cartId, { products: cartData.products } , { new: true } ); 
                return "Update the product to the cart success"
            } else {
                // If the product doesn't exist in the cart, add it to the cart's products
                // cartData.products.push({ product: productId, count: 1});
                await this.CartModel.findByIdAndUpdate(cartId, { products: cartData.products } , { new: true }); 
                return "Add the product to the cart success"
            } 
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    async removeIitem( 
        cartId:string,
        productId: string
    ){
        try {
            const cartData = await this.CartModel.findById( cartId ).lean(true).exec();
            const existingProductIndex = cartData.products.findIndex((p: { product: string }) =>  p.product === productId );
            if (existingProductIndex !== -1) {
                // If the product exists in the cart, update its fields
                const numberProducts: number = cartData.products[existingProductIndex].count;
                if(numberProducts > 0){
                    cartData.products[existingProductIndex].count -= 1;
                    await this.CartModel.findByIdAndUpdate(cartId, { products: cartData.products } , { new: true } ); 
                    return "Update the product to the cart success"
                }else{
                    cartData.products.filter(item => item.product !== productId );
                    await this.CartModel.findByIdAndUpdate(cartId, { products: cartData.products } , { new: true } ); 
                    return "Remove the product from the cart success"
                }
            }
            throw new HttpException("Product Id wasn't exist", HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }

    async updateAll(
        cartId: string,
        products: any,
    ): Promise<string>{
        console.log(products)
        try { 
            const cartData = await this.CartModel.findById( cartId );
            if(!cartData) throw new NotFoundException(`Not found cart ID`);     
            cartData.products = products.map((item: ProductInTheCartDto) => ({
                product: item.product,
                count: item.count,
            }));
            const updateCart = await cartData.save();
            if(!updateCart) throw new HttpException("Upddate Fail", HttpStatus.BAD_REQUEST);
            return "Update  all data of Cart Success";
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }
}
