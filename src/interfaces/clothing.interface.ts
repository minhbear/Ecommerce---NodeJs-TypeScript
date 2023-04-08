import { Document, LeanDocument, Types } from "mongoose";

export interface Clothing{
    brand: string;
    size: string;
    material: string;
    product_shop: Types.ObjectId | string;
}

export interface LeanClothingDocument extends LeanDocument<Clothing & Document> {}