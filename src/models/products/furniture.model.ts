import { Furniture } from "@/interfaces/furniture.interface";
import { Document, Schema, model } from "mongoose";

const DOCUMENT_NAME = "Furniture";
const COLLECTION_NAME = "Furnitures";

const furnitureSchema = new Schema({
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

const furnitureModel = model<Furniture & Document>(DOCUMENT_NAME, furnitureSchema);

export default furnitureModel;