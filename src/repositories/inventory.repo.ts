import { LeanInventoryDocument } from "@/interfaces/inventory.interface";
import inventoryModel from "@/models/inventory.model";

export class InventoryRepo{
    static async insertInventory({ productId, shopId, stock, location = "unknow" }: { productId: string, shopId: string, stock: number, location?: string }): Promise<LeanInventoryDocument> {
        return await inventoryModel.create({ inven_localtion: location, inven_productId: productId, inven_shopId: shopId, inven_stock: stock });
    }
}