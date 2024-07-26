import { PickType } from "@nestjs/mapped-types";
import { Exclude, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose"; 
import { DataUserResponseDto } from "src/auth/dtos/dataUserResponse.dto";
 

export class UserDto extends PickType(DataUserResponseDto, ['city', 'country', 'gender', 'address', 'phone'] as const) {}
