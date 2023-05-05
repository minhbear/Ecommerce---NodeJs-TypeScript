import { Schema, model, Document } from "mongoose";
import { CartInterface } from "@/interfaces/cart.interface";

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const cartSchema: Schema = new Schema({
    cart_state: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cart_products: {
        type: Array,
        required: true,
        default: []
    },
    cart_cout_product: {
        type: Number,
        default: 0,
    },
    cart_userId: {
        type: Number,
        required: true,
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    },
});

const cartModel = model<CartInterface & Document>(DOCUMENT_NAME, cartSchema);

export default cartModel;