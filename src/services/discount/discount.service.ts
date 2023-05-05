import { CreateDiscountCodeDto, GetAmountApplyDiscount, UpdateDiscountCodeDto } from "@/dtos/discount.dto";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import discountModel from "@/models/discount.model";
import { DiscountBuilder } from "./discount-builder";
import { Discount } from "@/interfaces/discount.interface";
import { NotFoundErrorException } from "@/exceptions/NotFoundError.exception";
import DiscountRepo from "@/repositories/discount.repo";
import { convertToObjectIDMongoose, removeUndefinedObject } from "@/utils/util";
import { DisccountApply, DiscountType } from "@/common/enum/discount-type";
import ProductRepo from "@/repositories/product.repo";
import { ProductsSort } from "@/common/enum/products.sort";
import { LeanProductDocument } from "@/interfaces/product.interface";

export class DiscountService {
    async createDiscountCode(payload: CreateDiscountCodeDto) {
        const {
            code,
            appliesTo,
            description,
            endDate,
            isActive,
            maxUses,
            maxUsesPerUser,
            maxValue,
            minOrderValue,
            name,
            productIds,
            shopId,
            startDate,
            type,
            usersUsed,
            usesCount,
            value
        } = payload;

        if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
            throw new BadRequestErrorException({ message: "Discount code has expired!" });
        }

        if (new Date(startDate) > new Date(endDate)) {
            throw new BadRequestErrorException({ message: "Start date must be before end date" });
        };

        const foundDiscount = await DiscountRepo.findDiscountByShopAndCode(code, shopId);

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestErrorException({ message: "Discount exists" });
        }

        const discountBuilder = new DiscountBuilder();
        const newDiscount: Discount = discountBuilder
            .withDiscountName(name)
            .withDiscountDescription(description)
            .withDiscountValue(value)
            .withDiscountCode(code)
            .withDiscountStartDate(startDate)
            .withDiscountEndDate(endDate)
            .withDiscountMaxUses(maxUses)
            .withDiscountUsesCount(usesCount)
            .withDiscountMaxValue(maxValue)
            .withDiscountUsersUsed(usersUsed)
            .withDiscountMaxUsePerUsers(maxUsesPerUser)
            .withDiscountMinOrderValue(minOrderValue)
            .withDiscountShopId(shopId)
            .withDiscountIsActive(isActive)
            .withDiscountAppliesTo(appliesTo)
            .withDiscountProductIds(productIds)
            .withDiscountType(type)
            .buildDiscount();
        
        return discountModel.create(newDiscount);
    }

    async updateDiscountCode(payload: UpdateDiscountCodeDto, discountId: string) {
        const { appliesTo, endDate, isActive, maxUses, maxValue, minOrderValue, productIds, shopId, startDate, description, name } = payload;
        const discount = await discountModel.findOne({ _id: discountId, discount_shopId: shopId }).exec();

        if(!discount) {
            throw new NotFoundErrorException({ message: "Not found discount" });
        }

        if(new Date(startDate) > new Date(endDate)) {
            throw new BadRequestErrorException({ message: "Invalid start date and end date" });
        }


        if(new Date(startDate) > new Date() || new Date() > new Date(endDate)) {
            throw new BadRequestErrorException({ message: "Invalid start date and end date" });
        }

        const filter: Partial<Discount> = {
            discount_applies_to: appliesTo,
            discount_end_date: endDate,
            discount_is_active: isActive,
            discount_max_uses: maxUses,
            discount_max_value: maxValue,
            discount_min_order_value: minOrderValue,
            discount_product_ids: productIds,
            discount_start_date: startDate,
            discount_description: description,
            discount_name: name
        };

        return await DiscountRepo.updateDiscount(discountId, removeUndefinedObject(filter));;
    }

    async getAllDiscountCodeWithProduct({
        code,
        shopId,
        limit = 50,
        page = 1
    }) {
        const foundDiscount = await DiscountRepo.findDiscountByShopAndCode(code, shopId);

        if(!foundDiscount || !foundDiscount.discount_is_active) {
            throw new NotFoundErrorException({ message: "discount not exist" })
        }
        
        const { discount_applies_to, discount_product_ids } = foundDiscount;
        console.log(discount_product_ids);

        let products: LeanProductDocument[];
        if(discount_applies_to === DisccountApply.ALL) {
            products = await ProductRepo.findAllProduct({
                filter: {
                    isPublished: true,
                    product_shop: shopId
                },
                limit: +limit,
                page: +page,
                sort: ProductsSort.C_TIME,
                select: ["product_name"]
            })
        }

        if(discount_applies_to === DisccountApply.SPECIFIC) {

            products = await ProductRepo.findAllProduct({
                filter: {
                    _id:  { $in: discount_product_ids},
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: ProductsSort.C_TIME,
                select: ["product_name"]
            })
        }

        return products;
    }

    async getAllDiscountByShop({ 
        shopId,
        limit = 50,
        page = 1
    }) {
        const discounts = await DiscountRepo.findAllDiscountCodesUnSelect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: convertToObjectIDMongoose(shopId),
                discount_is_active: true,
            },
            unselect: ["__v", "discount_shopId"]
        });

        return discounts;
    }
    
    async getDiscountAmount({ codeId, userId, shopId, products }: GetAmountApplyDiscount) {
        const foundDiscount = await DiscountRepo.findDiscountByShopAndCode(codeId, shopId);

        if(!foundDiscount) {
            throw new NotFoundErrorException({ message: "Not found discount code" });
        }

        const {
            discount_is_active,
            discount_max_uses,
            discount_start_date,
            discount_end_date,
            discount_min_order_value,
            discount_type,
            discount_value
        } = foundDiscount;

        if(!discount_is_active) {
            throw new BadRequestErrorException({ message: "Discount expired" });
        }

        if(discount_max_uses === 0) {
            throw new NotFoundErrorException({ message: "Discount are out" });
        }

        if(new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
            throw new BadRequestErrorException({ message: "Discount expired" });
        }

        console.log(products.reduce((acc, product) => {
            console.log(product)
            return acc + product.price * product.quantity
        }, 0));

        let totalOrder = 0;
        if(discount_min_order_value >= 0) {
            totalOrder = products.reduce((acc, product) => {
                return acc + (product.price * product.quantity);
            }, 0)

            if(totalOrder < discount_min_order_value) {
                throw new BadRequestErrorException({ message: `Discount requires a minimum order value of ${ discount_min_order_value }`});
            }
        }

        const amount = discount_type === DiscountType.FIXED_AMOUNT ? discount_value : totalOrder * (discount_value / 100);

        console.log(foundDiscount)

        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }

    async deleteDiscountCode({ shopId, codeId }) {
        const deleted = await discountModel.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: shopId
        }).exec();

        return deleted;
    }

    async cancelDiscountCode({ codeId, shopId, userId }) {
        const foundDiscount = await DiscountRepo.findDiscountByShopAndCode(codeId, shopId);

        if(!foundDiscount) {
            throw new NotFoundErrorException({ message: "Not found discount code" });
        }

        const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        }).exec();

        return result;
    }
}