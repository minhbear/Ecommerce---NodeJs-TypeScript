import { IsOptional } from "class-validator";

export abstract class BaseFilterDto {
    @IsOptional()
    readonly limit?: number = 50;
    
    @IsOptional()
    readonly page?: number = 1;
}