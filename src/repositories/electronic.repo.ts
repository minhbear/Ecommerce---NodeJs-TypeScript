import { LeanElectronicDocument } from "@/interfaces/electronic.interface";
import electronicModel from "@/models/products/electronic.model";

export default class ElectronicRepo{
    static async createElectronic(createElectronic: any): Promise<LeanElectronicDocument> {
        return await electronicModel.create({ ...createElectronic });
    }

    static async updateProductElectronic({ product_id, productUpdate }: { product_id: string, productUpdate: any }): Promise<LeanElectronicDocument> {
        return await electronicModel.findByIdAndUpdate(product_id, productUpdate, { new: true}).exec();
    }
}