import { LeanClothingDocument } from "@/interfaces/clothing.interface";
import clothingModel from "@/models/products/clothing.model";

export default class ClothingRepo {
    static async createClothing(createClothing: any): Promise<LeanClothingDocument> {
        return await clothingModel.create({ ...createClothing });
    }

    static async updateProductClothing({ product_id, productUpdate }: { product_id: string, productUpdate: any }): Promise<LeanClothingDocument> {

        return await clothingModel.findByIdAndUpdate(product_id, productUpdate, {
            new: true
        }).exec();
    }
}