import { BaseFilterDto } from "@/common/base-filter.dto";
import { ProductsSelectField } from "@/common/enum/product.type";
import { ProductsSort } from "@/common/enum/products.sort";
import { ProductsFilter } from "@/common/type/productQuery";
import { IsArray, IsEnum, IsOptional } from "class-validator";


export class FilterProductsDto extends BaseFilterDto  {
    select?: ProductsSelectField[]
    
    @IsOptional()
    @IsEnum(ProductsSort)
    sort?: ProductsSort
    
    filter?: ProductsFilter
}

export class ProductSelectQuery {
    @IsOptional()
    @IsArray()
    select?: ProductsSelectField[];
}