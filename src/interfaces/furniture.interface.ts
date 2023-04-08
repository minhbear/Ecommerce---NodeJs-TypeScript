import { Document, LeanDocument, Types } from "mongoose";

export interface Furniture{
    brand: string;
    size: string;
    material: string;
    product_shop: Types.ObjectId | string;
}

export interface LeanFurnitureDocument extends LeanDocument<Furniture & Document> {}