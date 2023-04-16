import { ProductType } from "@/common/enum/product.type";
import { CreateProductDto } from "@/dtos/product.dto";
import { LeanProductDocument } from "@/interfaces/product.interface";
import { InventoryRepo } from "@/repositories/inventory.repo";
import ProductRepo from "@/repositories/product.repo";

export default class ProductBase {
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_slug: string;
    product_price: number;
    product_quantity: number;
    product_type: ProductType;
    product_shop: string;
    product_attributes: any;

    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
    }: CreateProductDto) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    async createProduct(product_id: string): Promise<LeanProductDocument> {
        const newProduct: LeanProductDocument = await ProductRepo.createProduct(this, product_id);
    
        // add stock of product to inventory
        await InventoryRepo.insertInventory({ productId: newProduct._id, shopId: this.product_shop, stock: this.product_quantity })

        return newProduct
    }

    async updateProduct(product_id: string, productUpdate: any){
        return await ProductRepo.updateProduct({ product_id, productUpdate });
    }
}