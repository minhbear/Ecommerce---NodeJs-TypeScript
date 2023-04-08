import { LeanProductDocument } from "@/interfaces/product.interface";
import ProductBase from "./product-base";
import ClothingRepo from "@/repositories/clothing.repo";
import { LeanClothingDocument } from "@/interfaces/clothing.interface";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";

export default class ClothingProduct extends ProductBase{
    
    async createProduct(): Promise<LeanProductDocument> {
        const newClothing: LeanClothingDocument = await ClothingRepo.createClothing({  product_shop: this.product_shop, ...this.product_attributes });
        if(!newClothing) {
            throw new BadRequestErrorException({ message: "create new clothing error" });
        }

        const newProduct: LeanProductDocument = await super.createProduct(newClothing._id);

        if(!newProduct) {
            throw new BadRequestErrorException({ message: "Create new product error" });
        }

        return newProduct;
    }
}