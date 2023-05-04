import { Discount } from '@/interfaces/discount.interface';
import { Document, Schema, model } from 'mongoose';

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "discounts";

// Declare the Schema of the Mongo model
const discountSchema: Schema = new Schema({
    discount_name: { type: String, required: true }, // name of discount
    discount_description: { type: String }, // description of discount
    discount_type: { type: String, default: 'fixed_amount' }, // type of discount: percentage or fix amount
    discount_value: { type: Number, required: true }, // value of discount - percentage %value - fixed_amount: fix value
    discount_code: { type: String, required: true }, // discount code
    discount_start_date: { type: Date, required: true },
    discount_end_date: { type: Date, required: true },
    discount_max_uses: { type: Number, required: true }, // number of discount can used
    discount_uses_count: { type: Number, required: true }, // number of discount had been used
    discount_users_used: { type: Array, default: [] }, // list users had used this discount
    discount_max_value: { type: Number, required: true },
    discount_max_uses_per_user: { type: Number, required: true }, // max discount can be use by user
    discount_min_order_value: { type: Number, required: true }, // the value of order that can used discount
    discount_shopId: { type: Schema.Types.ObjectId, ref: "Shop" }, // owner of discount
    discount_is_active: { type: Boolean, default: true }, // discount is active or not
    discount_applies_to: { type: String, required: true, enum: ['all', 'specific'] }, // discount apply to
    discount_product_ids: {type: Array, default: [] } // number of product is apply this discount
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
const discountModel = model<Document & Discount>(DOCUMENT_NAME, discountSchema);
export default discountModel;