import { ProductDraftQuery, ProductPublishedQuery, ProductQuery } from "@/common/type/productQuery";
import { ForBiddenException } from "@/exceptions/ForbiddenError.exception";
import { LeanProductDocument, Product } from "@/interfaces/product.interface";
import productModel from "@/models/products/product.model";
import { Document } from "mongoose";

export default class ProductRepo{
    static async createProduct(createProduct: Partial<Product>, id: string): Promise<LeanProductDocument> {
        return await productModel.create({ ...createProduct, _id: id });
    }
    

    static async findAllDraftForShop ({ query, limit, skip }: { query: ProductDraftQuery, limit: number, skip: number }): Promise<LeanProductDocument[]>  {
        return await ProductRepo.queryProduct({ query, limit, skip });
    }

    static async findAllPublishedForShop ({ query, limit, skip }: { query: ProductPublishedQuery, limit: number, skip: number }): Promise<LeanProductDocument[]>  {
        return await ProductRepo.queryProduct({ query, limit, skip });
    }

    static async queryProduct ({ query, limit, skip }: { query: ProductQuery, limit: number, skip: number }): Promise<LeanProductDocument[]> {
        return await productModel
            .find(query)
            .populate("product_shop", "name email -_id")
            .sort({ UpdateAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec()
    }

    static async pulishProductByShop({ product_shop, product_id }: { product_shop: string, product_id: string }): Promise<number> {
        const foundProduct= await productModel.findOne({ product_shop, _id: product_id });
        if(!foundProduct) {
            // throw new ForBiddenException({ message: "Action deined" });
            return null;
        }

        foundProduct.isDraft = false;
        foundProduct.isPublished = true;

        const { modifiedCount } = await foundProduct.updateOne(foundProduct);
        return modifiedCount;
    }

    static async unpublishProductByShop({ product_shop, product_id }: { product_shop: string, product_id: string }): Promise<number> {
        const foundProduct= await productModel.findOne({ product_shop, _id: product_id });
        if(!foundProduct) {
            // throw new ForBiddenException({ message: "Action deined" });
            return null;
        }

        foundProduct.isDraft = true;
        foundProduct.isPublished = false;

        const { modifiedCount } = await foundProduct.updateOne(foundProduct);
        return modifiedCount;
    }
}