import { CreateDiscountCodeDto, UpdateDiscountCodeDto } from "@/dtos/discount.dto";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import discountModel from "@/models/discount.model";
import { DiscountBuilder } from "./discount-builder";
import { Discount } from "@/interfaces/discount.interface";
import { NotFoundErrorException } from "@/exceptions/NotFoundError.exception";
import DiscountRepo from "@/repositories/discount.repo";
import { convertToObjectIDMongoose, removeUndefinedObject } from "@/utils/util";
import { DisccountApply } from "@/common/enum/discount-type";
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
    
}