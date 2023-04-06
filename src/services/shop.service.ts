import { LeanShopDocument } from "@/interfaces/shop.interface";
import ShopRepo from "@/repositories/shop.repo";

export default class ShopService {

    public async findShopByEmail({ email }: { email: string }): Promise<LeanShopDocument> {
        return await ShopRepo.findShopByEmail({ email });
    }

    public async createShop(
        { name, email, password, roles }:
            {
                name: string,
                email: string,
                password: string,
                roles: string[]
            }): Promise<LeanShopDocument> {
        return await ShopRepo.createShop({ name, email, password, roles })
    }

    public async findShopById({ _id }: { _id: string }): Promise<LeanShopDocument> {
        return await ShopRepo.findShopById({ _id });
    }
}