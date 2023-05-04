import discountModel from "@/models/discount.model";
import { getDataSelect, getDataUnselect } from "../utils/util";
import { SortOrder } from "mongoose";

export default class DiscountRepo {
    static async findAllDiscountCodesUnSelect(
        {
            limit = 50, page = 1, sort = 'ctime',
            filter, unselect
        }:
            {
                limit?: number, page?: number, sort?: string
                filter: any, unselect: string[]
            }
    ) {
        const skip = (page - 1) * limit;
        const sortBy: { [key: string]: SortOrder } = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const documents = await discountModel.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getDataUnselect(unselect))
            .exec();

        return documents;
    }

    static async findAllDiscountCodesSelect (
        {
            limit = 50, page = 1, sort = 'ctime',
            filter, select
        }:
            {
                limit?: number, page?: number, sort?: string
                filter: any, select: string[]
            }
    ) {
        const skip = (page - 1) * limit;
        const sortBy: { [key: string]: SortOrder } = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const documents = await discountModel.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getDataSelect(select))
            .exec();

        return documents;
    }

    static async findDiscountByShopAndCode(code: string, discountShopId: string) {
        return await discountModel.findOne({
            discount_code: code,
            discount_shopId: discountShopId
        }).exec();
    }

    static async updateDiscount(id: string, payload: any) {
        return await discountModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }
}