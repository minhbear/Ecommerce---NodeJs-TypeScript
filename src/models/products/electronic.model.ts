import { Electronic } from "@/interfaces/electronic.interface";
import { Document, Schema, model } from "mongoose";

const DOCUMENT_NAME = "Electronic";
const COLLECTION_NAME = "Eletronics";

const eletronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true,
    },
    model: String,
    color: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

const electronicModel = model<Electronic & Document>(DOCUMENT_NAME, eletronicSchema);

export default electronicModel