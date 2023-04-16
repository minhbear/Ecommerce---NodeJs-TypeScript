import { Schema, model, Document } from "mongoose";
import { Inventory } from "@/interfaces/inventory.interface";

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema: Schema = new Schema({
    inven_productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    inven_location: {
        type: String,
        default: 'unknow'
    },
    inven_stock: { 
        type: Number,
        required: true
    },
    inven_shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    inven_reservation: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const inventoryModel = model<Inventory & Document>(DOCUMENT_NAME, inventorySchema);

export default inventoryModel;