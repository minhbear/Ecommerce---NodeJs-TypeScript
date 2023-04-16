import { LeanFurnitureDocument } from "@/interfaces/furniture.interface";
import { LeanProductDocument } from "@/interfaces/product.interface";
import FurnitureRepo from "@/repositories/furniture.repo";
import ProductBase from "./product-base";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { removeUndefinedObject, updateNestedObject } from "@/utils/util";

export class FurnitureProduct extends ProductBase {
    async createProduct(): Promise<LeanProductDocument>{
        const newFurinutre: LeanFurnitureDocument = await FurnitureRepo.createFurniture({ ...this.product_attributes, product_shop: this.product_shop });
        if(!newFurinutre) {
            throw new BadRequestErrorException({ message: "create new furniture error" });
        }

        const newProduct: LeanProductDocument = await super.createProduct(newFurinutre._id);
        if(!newProduct) {
            throw new BadRequestErrorException({ message: "create new product error" });
        }

        return newProduct;
    }

    async updateProduct(product_id: string): Promise<LeanProductDocument>{
        const objParam: this = removeUndefinedObject(this);
        if(objParam.product_attributes) {
            await FurnitureRepo.updateProductFurniture({ 
                product_id,
                productUpdate: updateNestedObject(objParam.product_attributes)
             })
        }

        const updateProduct: LeanProductDocument = await super.updateProduct(product_id, updateNestedObject(objParam));

        return updateProduct;
    }
}