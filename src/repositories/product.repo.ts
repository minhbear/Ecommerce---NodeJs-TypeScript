import { ProductsSort } from "@/common/enum/products.sort";
import { ProductDraftQuery, ProductPublishedQuery, ProductQuery, ProductsFilter } from "@/common/type/productQuery";
import { LeanProductDocument, Product } from "@/interfaces/product.interface";
import productModel from "@/models/products/product.model";
import { convertToObjectIDMongoose, getDataSelect, getDataUnselect } from "@/utils/util";
import { SortOrder } from "mongoose";

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

    static async searchProductByUser({ keySearch }: { keySearch: string }): Promise<LeanProductDocument[]> {
        console.log(keySearch);
        const regexSearch: string = new RegExp(keySearch).toString();
        console.log(regexSearch);

        const result = await productModel.find(
            {
                isPublished: true,
                $text: { $search: regexSearch }
            },
            {
                score: { $meta: "textScore" }
            }
        )
        .sort({ score: { $meta: "textScore" } })
        .lean()
        .exec()

        return result;
    }

    static async findAllProduct({ limit, page, sort, select, filter }: {
        limit: number,
        page: number,
        sort: ProductsSort,
        select: string[],
        filter: ProductsFilter
    }): Promise<LeanProductDocument[]> {
        const skip: number = (page - 1) * limit;
        const sortBy: { [key: string]: SortOrder } = sort === ProductsSort.C_TIME ? { _id: -1 } : { _id: 1 };
        return await productModel.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getDataSelect(select))
            .lean()
            .exec();
    }

    static async findProduct({ product_id, unSelect }: {product_id: string, unSelect: string[]}): Promise<LeanProductDocument> {
        return await productModel.findById(product_id).select(getDataUnselect(unSelect)).exec();
    }

    static async updateProduct({ product_id, productUpdate }: { product_id: string, productUpdate: any }): Promise<LeanProductDocument> {
        return await productModel.findByIdAndUpdate(product_id, productUpdate, { new: true}).exec();
    }

    static async getProductById(productId) {
        return await productModel.findOne({ _id: convertToObjectIDMongoose(productId) }).lean().exec();
    }
}