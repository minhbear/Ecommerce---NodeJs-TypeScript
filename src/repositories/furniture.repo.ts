import { LeanFurnitureDocument } from "@/interfaces/furniture.interface";
import furnitureModel from "@/models/products/furniture.model";

export default class FurnitureRepo {
    static async createFurniture(createFurniture: any): Promise<LeanFurnitureDocument> {
        return await furnitureModel.create(createFurniture);
    }

    static async updateProductFurniture({ product_id, productUpdate }: { product_id: string, productUpdate: any }): Promise<LeanFurnitureDocument> {
        return await furnitureModel.findByIdAndUpdate(product_id, productUpdate, {
            new: true
        }).exec();
    }
}