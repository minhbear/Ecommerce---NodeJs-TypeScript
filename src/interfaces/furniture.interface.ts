import { Types } from "mongoose";

export interface Furniture{
    brand: string;
    size: string;
    material: string;
    product_shop: Types.ObjectId;
}