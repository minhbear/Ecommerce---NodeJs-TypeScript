import { Document, LeanDocument, Types } from "mongoose";

export interface Inventory{
    inven_productId: string,
    inven_localtion: string,
    inven_stock: string, // number of inventory product
    inven_shopId: string,
    inven_reservation: Types.Array<string> // dat truoc
}

export interface LeanInventoryDocument extends LeanDocument<Inventory & Document>{};