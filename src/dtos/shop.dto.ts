import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateShopDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class LoginShopDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ReturnShopDto {
    shop: {
        _id: string;
        name: string;
        email: string;
    }

    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}