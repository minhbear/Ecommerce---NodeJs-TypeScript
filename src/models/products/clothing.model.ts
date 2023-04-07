import { Clothing } from "@/interfaces/clothing.interface";
import { Document, Schema, model } from "mongoose";

const DOCUMENT_NAME = "Clothing";
const COLLECTION_NAME = "Clothes";

const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

const clothingModel = model<Clothing & Document>(DOCUMENT_NAME, clothingSchema);

export default clothingModel;