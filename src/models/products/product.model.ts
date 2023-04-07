import { ProducType } from "@/common/enum/product.type";
import { Product } from "@/interfaces/product.interface";
import { Document, Schema, model } from "mongoose";
import slugify from "slugify";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
        required: true,
    },
    product_description: String,
    product_slug: String,
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
        enum: [ProducType.ELECTRONIC, ProducType.CLOTHING, ProducType.FURNITURE],
    },
    product_shop: {
        type: Schema.Types.ObjectId, ref: "Shop"
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true,
    },
    product_ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must above 1.0"],
        max: [5, "Rating must be at most 5"],
        set: (val: number) => Math.round(val * 10) / 10
    },
    product_variations: {
        type: Array,
        default: []
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true, // mark index,
        select: false,
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

// Mark index for search
productSchema.index({ product_name: 'text', product_description: 'text' });

// Middleware run before .save(), .create(), ...
productSchema.pre("save", function(next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

const productModel = model<Product & Document>(DOCUMENT_NAME, productSchema);

export default productModel;