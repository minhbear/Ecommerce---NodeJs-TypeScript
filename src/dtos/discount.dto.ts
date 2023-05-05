import { DisccountApply, DiscountType } from "@/common/enum/discount-type";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateDiscountCodeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(DiscountType)
    type: DiscountType; // percentage

    @IsNumber()
    value: number;

    @IsString()
    code: string;

    @IsDateString()
    startDate: Date;
    
    @IsDateString()
    endDate: Date;
    
    @IsNumber()
    maxUses: number;
    
    @IsNumber()
    usesCount: number;
    
    @IsNumber()
    maxValue: number;
    
    @IsArray()
    usersUsed: string[];
    
    @IsNumber()
    maxUsesPerUser: number;
    
    @IsNumber()
    minOrderValue: number;
    
    shopId: string;

    @IsBoolean()
    isActive: boolean;

    @IsEnum(DisccountApply)
    appliesTo: DisccountApply;

    @IsArray()
    productIds: string[]
}

export class UpdateDiscountCodeDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsDateString()
    startDate: Date;
    
    @IsOptional()
    @IsDateString()
    endDate: Date;

    @IsOptional()
    @IsNumber()
    maxUses: number;

    @IsOptional()
    @IsNumber()
    maxValue: number;

    @IsOptional()
    @IsNumber()
    minOrderValue: number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsEnum(DisccountApply)
    appliesTo: DisccountApply;

    @IsOptional()
    @IsArray()
    productIds: string[];

    shopId: string;
}

export class FilterDiscountDto {
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsString()
    code: string;

    @IsString()
    shopId: string;
}

export class FilterDiscountByShop {
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    page?: number;

    shopId: string;
}

export class GetAmountApplyDiscount {
    @IsString()
    codeId: string;

    @IsString()
    userId: string;

    @IsString()
    shopId: string;

    @IsArray()
    products: ProductApplyDiscount[]
}

class ProductApplyDiscount {
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}