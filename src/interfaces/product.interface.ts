import { ProductType } from "@/common/enum/product.type";
import { Document, LeanDocument, Types } from "mongoose";

export interface Product {
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_slug: string;
    product_price: number;
    product_quantity: number;
    product_type: ProductType;
    product_shop: Types.ObjectId | string;
    product_attributes: any;
    product_ratingsAverage: number;
    product_variations: Types.Array<any> | string[] | number[];
    isDraft: boolean;
    isPublished: boolean;
}

export interface LeanProductDocument extends LeanDocument<Product & Document>{};