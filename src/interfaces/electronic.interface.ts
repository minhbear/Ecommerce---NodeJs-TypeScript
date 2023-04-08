import { Document, LeanDocument, Types } from "mongoose";

export interface Electronic{
    manufacturer: string;
    model: string;
    color: string;
    product_shop: Types.ObjectId | string;
}

export interface LeanElectronicDocument extends LeanDocument<Electronic & Document> {}