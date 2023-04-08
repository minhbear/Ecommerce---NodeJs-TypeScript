import { LeanFurnitureDocument } from "@/interfaces/furniture.interface";
import furnitureModel from "@/models/products/furniture.model";

export default class FurnitureRepo {
    static async createFurniture(createFurniture: any): Promise<LeanFurnitureDocument> {
        return await furnitureModel.create(createFurniture);
    }
}