import { LeanElectronicDocument } from "@/interfaces/electronic.interface";
import { LeanProductDocument } from "@/interfaces/product.interface";
import ElectronicRepo from "@/repositories/electronic.repo";
import ProductBase from "./product-base";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";

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
}   