import { PickType } from "@nestjs/mapped-types";
import { Exclude, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose"; 
import { DataUserResponseDto } from "src/auth/dtos/dataUserResponse.dto";
import { Sex } from "src/common/types/sex.enum";
 

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    gender: Sex;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    country: string;


    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    phone: string;

} 
