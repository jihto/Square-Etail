import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.model';
import { Cart } from 'src/schemas/cart.model';  
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    MongooseModule.forFeature([ User, Cart]),  
    HttpModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
