import { BaseFilterDto } from "@/common/base-filter.dto";
import { ProductType } from "@/common/enum/product.type";
import { Product } from "@/interfaces/product.interface";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsNotEmpty()
    product_thumb: string;

    @IsString()
    @IsNotEmpty()
    product_description: string;

    @IsNumber()
    @IsNotEmpty()
    product_price: number;

    @IsNumber()
    @IsNotEmpty()
    product_quantity: number;

    @IsEnum(ProductType)
    @IsNotEmpty()
    product_type: ProductType;

    product_shop?: string;

    @IsObject()
    @IsNotEmpty()
    product_attributes: any;
}



