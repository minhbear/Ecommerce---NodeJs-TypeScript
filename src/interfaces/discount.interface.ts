import { DisccountApply, DiscountType } from "@/common/enum/discount-type";
import { Document, LeanDocument, Types } from "mongoose";

export interface Discount {
    discount_name: string,
    discount_description: string,
    discount_type: DiscountType, // percentage
    discount_value: number,
    discount_code: string,
    discount_start_date: Date,
    discount_end_date: Date,
    discount_max_uses: number,
    discount_uses_count: number,
    discount_max_value: number,
    discount_users_used: string[],
    discount_max_uses_per_user: number, // max discount can be use by user
    discount_min_order_value: number,
    discount_shopId: string | Types.ObjectId,
    discount_is_active: boolean,
    discount_applies_to: DisccountApply,
    discount_product_ids: string[]// num
}

export interface LeanDiscountDocument extends LeanDocument<Discount & Document>{} ;