import { ProductType, ProductsSelectField } from "@/common/enum/product.type";
import ClothingProduct from "./clothing.product";
import { ElectronicProduct } from "./electronic.product";
import { FurnitureProduct } from "./furniture.product";
import { BadRequestErrorException } from "@/exceptions/BadRequestError.exception";
import { CreateProductDto } from "@/dtos/product.dto";
import { LeanProductDocument } from "@/interfaces/product.interface";
import ProductRepo from "@/repositories/product.repo";
import { ProductDraftQuery, ProductPublishedQuery, ProductsFilter } from "@/common/type/productQuery";
import { ProductsSort } from "@/common/enum/products.sort";
import { FilterProductsDto } from "@/dtos/product-filter.dto";

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
     * @desc Update product 
     * @param {ProductType} type 
     * @param {any} payload 
     * @param {string} product_id 
     * @returns {LeanProductDocument}
     */
    static async updateProduct(type: ProductType, payload: any, product_id: string): Promise<LeanProductDocument> {
        const productClass = ProductFactoryService.productRegistry[type];
        if(!productClass) {
            throw new BadRequestErrorException({ message: `Invalid product type: ${type}` });
        }

        return new productClass(payload).updateProduct(product_id);
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

    /**
    * @desc  UnPublish from product draft
    * @param {string} product_shop
    * @param {string} product_id
    * @returns {number | null}
    */
    static async unpublishProductShop({ product_shop, product_id }: { product_shop: string, product_id: string }): Promise<number> {
        return await ProductRepo.unpublishProductByShop({ product_shop, product_id });
    }

    /**
     * find list of product with keyword keySearch
     * @param {string} keySearch 
     * @returns {LeanProductDocument}
     */
    static async searchProductByUser({ keySearch }: { keySearch: string }): Promise<LeanProductDocument[]> {
        return await ProductRepo.searchProductByUser({ keySearch });
    }


    /**
     * This function finds all products based on specified parameters and returns a promise of an array
     * of lean product documents.
     * @param {number} limit: number products need take
     * @param {number} page
     * @param {ProductsSort} sort: type of sort list product
     * @param {ProductsSelectField[]} select: the field that need to take of one product
     * @param {ProductsFilter} filter: the condtition to take product
     * @returns {LeanProductDocument}
     */
    static async findAllProducts(
        {
            limit = 50, page = 1,
            sort = ProductsSort.C_TIME,
            select = [ProductsSelectField.PRODUCT_NAME, ProductsSelectField.PRODUCT_PRIZE, ProductsSelectField.PRODUCT_THUMB],
            filter = { isPublished: true }
        }: FilterProductsDto): Promise<LeanProductDocument[]> {
        return await ProductRepo.findAllProduct({ limit, page, sort, select, filter });
    }

    static async findProduct({ product_id }: { product_id: string }) {
        return await ProductRepo.findProduct({ product_id, unSelect: ['__v'] });
    }
}

// register product type
ProductFactoryService.registerProductType(ProductType.CLOTHING, ClothingProduct);
ProductFactoryService.registerProductType(ProductType.ELECTRONIC, ElectronicProduct);
ProductFactoryService.registerProductType(ProductType.FURNITURE, FurnitureProduct);