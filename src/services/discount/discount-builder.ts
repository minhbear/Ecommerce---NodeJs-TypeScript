import { DisccountApply, DiscountType } from "@/common/enum/discount-type";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { Discount } from "@/interfaces/discount.interface";

export class DiscountBuilder {
    private discount_name: string;
    private discount_description: string;
    private discount_type: DiscountType; // percentage
    private discount_value: number;
    private discount_code: string;
    private discount_start_date: Date;
    private discount_end_date: Date;
    private discount_max_uses: number;
    private discount_uses_count: number;
    private discount_max_value: number;
    private discount_users_used: string[];
    private discount_max_uses_per_user: number; // max discount can be use by user
    private discount_min_order_value: number;
    private discount_shopId: string;
    private discount_is_active: boolean;
    private discount_applies_to: DisccountApply;
    private discount_product_ids: string[];

    constructor() {}

    public withDiscountName(name: string) {
        this.discount_name = name;
        return this;
    }

    public withDiscountDescription(description: string) {
        this.discount_description = description;
        return this;
    }

    public withDiscountType(type: DiscountType) {
        this.discount_type = type;
        return this;
    }

    public withDiscountValue(value: number) {
        this.discount_value = value;
        return this;
    }

    public withDiscountCode(code: string) {
        this.discount_code = code;
        return this;
    }

    public withDiscountStartDate(startDate: Date) {
        this.discount_start_date = startDate;
        return this;
    }

    public withDiscountEndDate(endDate: Date) {
        this.discount_end_date = endDate;
        return this;
    }

    public withDiscountMaxUses(maxUses: number) {
        this.discount_max_uses = maxUses;
        return this;
    }

    public withDiscountUsesCount(usesCount: number) {
        this.discount_uses_count = usesCount;
        return this;
    }

    public withDiscountMaxValue(maxValue: number) {
        this.discount_max_value = maxValue;
        return this;
    }

    public withDiscountUsersUsed(userUsed: string[]) {
        this.discount_users_used = userUsed;
        return this;
    }

    public withDiscountMaxUsePerUsers(maxUsesPerUser: number) {
        this.discount_max_uses_per_user = maxUsesPerUser;
        return this;
    }

    public withDiscountMinOrderValue(minOrderValue: number) {
        this.discount_min_order_value = minOrderValue;
        return this;
    }

    public withDiscountShopId(shopId: string) {
        this.discount_shopId = shopId;
        return this;
    }

    public withDiscountIsActive(isActive: boolean) {
        this.discount_is_active = isActive;
        return this;
    }

    public withDiscountAppliesTo(appliesTo: DisccountApply) {
        this.discount_applies_to = appliesTo;
        return this;
    }

    public withDiscountProductIds(productIds: string[]) {
        this.discount_product_ids = productIds;
        return this;
    }

    public checkValidDayDiscount() {
        return new Date(this.discount_start_date) < new Date(this.discount_end_date);
    }

    public buildDiscount(): Discount {
        if(!this.checkValidDayDiscount()) {
            throw new BadRequestErrorException({message: "Invalid date of discount"});
        }

        const discount: Discount = {
            discount_name: this.discount_name,
            discount_description: this.discount_description,
            discount_type: this.discount_type,
            discount_code: this.discount_code,
            discount_value: this.discount_value,
            discount_min_order_value: this.discount_min_order_value || 0,
            discount_max_value: this.discount_max_value,
            discount_start_date: this.discount_start_date,
            discount_end_date: this.discount_end_date,
            discount_max_uses: this.discount_max_uses,
            discount_users_used: this.discount_users_used,
            discount_uses_count: this.discount_uses_count,
            discount_shopId: this.discount_shopId,
            discount_max_uses_per_user: this.discount_max_uses_per_user,
            discount_is_active: this.discount_is_active,
            discount_applies_to: this.discount_applies_to,
            discount_product_ids: this.discount_applies_to === DisccountApply.ALL ? [] : this.discount_product_ids,
        }

        return discount;
    }
}