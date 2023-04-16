import { LeanElectronicDocument } from "@/interfaces/electronic.interface";
import { LeanProductDocument } from "@/interfaces/product.interface";
import ElectronicRepo from "@/repositories/electronic.repo";
import ProductBase from "./product-base";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { removeUndefinedObject, updateNestedObject } from "@/utils/util";

export class ElectronicProduct extends ProductBase{
    async createProduct(): Promise<LeanProductDocument> {
        const newElectronic: LeanElectronicDocument = await ElectronicRepo.createElectronic({ ...this.product_attributes, product_shop: this.product_shop });
        if(!newElectronic) {
            throw new BadRequestErrorException({ message: "create new electronic error" });
        }

        const newProduct: LeanProductDocument = await super.createProduct(newElectronic._id);
        if(!newProduct) {
            throw new BadRequestErrorException({ message: "create new Product error" });
        }

        return newProduct;
    }

    async updateProduct(product_id: string): Promise<LeanProductDocument>{
        const objParam: this = removeUndefinedObject(this);
        if(objParam.product_attributes) {
            await ElectronicRepo.updateProductElectronic({ 
                product_id,
                productUpdate: updateNestedObject(objParam.product_attributes)
             })
        }

        const updateProduct: LeanProductDocument = await super.updateProduct(product_id, updateNestedObject(objParam));

        return updateProduct;
    }
}   