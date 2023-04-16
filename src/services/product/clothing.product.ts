import { LeanProductDocument } from "@/interfaces/product.interface";
import ProductBase from "./product-base";
import ClothingRepo from "@/repositories/clothing.repo";
import { LeanClothingDocument } from "@/interfaces/clothing.interface";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { removeUndefinedObject, updateNestedObject } from "@/utils/util";

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

    async updateProduct(product_id: string): Promise<LeanProductDocument>{
        const objParam: this = removeUndefinedObject(this);
        if(objParam.product_attributes) {
            await ClothingRepo.updateProductClothing({ 
                product_id,
                productUpdate: updateNestedObject(objParam.product_attributes)
             })
        }

        const updateProduct: LeanProductDocument = await super.updateProduct(product_id, updateNestedObject(objParam));

        return updateProduct;
    }
}