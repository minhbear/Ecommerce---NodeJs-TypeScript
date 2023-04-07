import { ProducType } from "@/common/enum/product.type";
import { Types } from "mongoose";

export interface Product {
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_slug: string;
    product_price: number;
    product_quantity: number;
    product_type: ProducType;
    product_shop: Types.ObjectId;
    product_attributes: any;
    product_ratingsAverage: number;
    product_variations: Types.Array<any>;
    isDraft: boolean;
    isPublished: boolean;

}