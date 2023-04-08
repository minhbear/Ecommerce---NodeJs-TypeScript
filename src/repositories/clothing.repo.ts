import { LeanClothingDocument } from "@/interfaces/clothing.interface";
import clothingModel from "@/models/products/clothing.model";

export default class ClothingRepo{
    static async createClothing(createClothing: any): Promise<LeanClothingDocument> {
        return await clothingModel.create({ ...createClothing });
    }
}