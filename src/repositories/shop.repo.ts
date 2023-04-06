import { LeanShopDocument } from "@/interfaces/shop.interface";
import shopModel from "@/models/shop.model";

export default class ShopRepo {
    static async findShopByEmail({ email }: { email: string }): Promise<LeanShopDocument> {
        return await shopModel.findOne({ email }).lean().exec();
    }

    static async createShop(
        { name, email, password, roles }:
            {
                name: string,
                email: string,
                password: string,
                roles: string[]
            }): Promise<LeanShopDocument> {
        return await shopModel.create({ name, email, password, roles });
    }

    static async findShopById({ _id }: { _id: string }): Promise<LeanShopDocument> {
        return await shopModel.findById(_id).lean().exec();
    }
}