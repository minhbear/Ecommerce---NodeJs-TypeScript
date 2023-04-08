import { ProductType } from "@/common/enum/product.type";
import ClothingProduct from "./clothing.product";
import { ElectronicProduct } from "./electronic.product";
import { FurnitureProduct } from "./furniture.product";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { CreateProductDto } from "@/dtos/product.dto";
import { LeanProductDocument } from "@/interfaces/product.interface";
import ProductRepo from "@/repositories/product.repo";
import { ProductDraftQuery, ProductPublishedQuery } from "@/common/type/productQuery";

export default class ProductFactoryService {
    static productRegistry = {};

    static registerProductType(type: ProductType, classRef: any) {
        ProductFactoryService.productRegistry[type] = classRef;
    }

    /**
     * @desc Create product 
     * @param {ProductType} type 
     * @param {CreateProductDto} payload 
     * @returns {LeanProductDocument}
     */
    static async createProduct(type: ProductType, payload: CreateProductDto): Promise<LeanProductDocument> {
        const productClass = ProductFactoryService.productRegistry[type];
        if (!productClass) {
            throw new BadRequestErrorException({ message: `Invalid product type: ${type}` });
        }

        return new productClass(payload).createProduct();
    }

    /**
    * @desc Get all Drafts product for shop
    * @param {string} product_shop
    * @param {number} limit
    * @param {number} skip
    *
    * @returns {LeanProductDocument[]}
    */
    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }: { product_shop: string, limit?: number, skip?: number }): Promise<LeanProductDocument[]> {
        const query: ProductDraftQuery = { product_shop, isDraft: true };
        return ProductRepo.findAllDraftForShop({ query, limit, skip });
    }

    /**
    * @desc Get all publised product for shop
    * @param {string} product_shop
    * @param {number} limit
    * @param {number} skip
    *
    * @returns {LeanProductDocument[]}
    */
    static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }: { product_shop: string, limit?: number, skip?: number }): Promise<LeanProductDocument[]> {
        const query: ProductPublishedQuery = { product_shop, isPublished: true };
        return ProductRepo.findAllPublishedForShop({ query, limit, skip });
    }

    /**
    * @desc Publish from product draft
    * @param {string} product_shop
    * @param {string} product_id
    * @returns {number | null}
    */
    static async publishProductByShop({ product_shop, product_id }: { product_shop: string, product_id: string }): Promise<number> {
        return await ProductRepo.pulishProductByShop({ product_shop, product_id });
    }

    static async unpublishProductShop({ product_shop, product_id }: { product_shop: string, product_id: string }): Promise<number> {
        return await ProductRepo.unpublishProductByShop({ product_shop, product_id });
    }
}

// register product type
ProductFactoryService.registerProductType(ProductType.CLOTHING, ClothingProduct);
ProductFactoryService.registerProductType(ProductType.ELECTRONIC, ElectronicProduct);
ProductFactoryService.registerProductType(ProductType.FURNITURE, FurnitureProduct);