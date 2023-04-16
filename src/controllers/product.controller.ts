import { FilterProductsDto, ProductSelectQuery } from "@/dtos/product-filter.dto";
import { CreateProductDto } from "@/dtos/product.dto";
import { RequestAttribute } from "@/interfaces/request.interface";
import { SuccessResponse } from "@/responses/success.response";
import ProductFactoryService from "@/services/product/product-factory.service";
import { NextFunction, Request, Response } from "express";

class ProductController {
    createProduct = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        const product: CreateProductDto = {
            ...req.body,
            product_shop: req.shop.id
        };

        new SuccessResponse({
            message: "Create product success",
            metadata: await ProductFactoryService.createProduct(product.product_type, product)
        }).send(res);
    }

    updateProduct = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Update Product success",
            metadata: await ProductFactoryService.updateProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.shop.id
            }, req.params.product_id)
        }).send(res);
    }

    publishProductByShop = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Published product success",
            metadata: await ProductFactoryService.publishProductByShop({ product_shop: req.shop.id, product_id: req.params.id })
        }).send(res);
    }

    unPublishProductByShop = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Unpublished product success",
            metadata: await ProductFactoryService.unpublishProductShop({ product_shop: req.shop.id, product_id: req.params.id })
        }).send(res);
    }

    getAllDraftForShop = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Get list of draft successs",
            metadata: await ProductFactoryService.findAllDraftsForShop({ product_shop: req.shop.id })
        })
        .send(res);
    }

    getAllPublishedForShop = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Get list of published successs",
            metadata: await ProductFactoryService.findAllPublishedForShop({ product_shop: req.shop.id })
        })
        .send(res);
    }

    searchProductByUser = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Get list of product with keyword successs",
            metadata: await ProductFactoryService.searchProductByUser({ keySearch: req.params.keySearch as string })
        })
        .send(res);
    }

    getAllProductsForUser = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        const filterProductsDto: FilterProductsDto = req.query;
        const productSelectQuery: ProductSelectQuery = req.body;
        filterProductsDto.select = productSelectQuery.select;
        new SuccessResponse({
            message: "Get list of product for uses successs",
            metadata: await ProductFactoryService.findAllProducts(filterProductsDto)
        })
        .send(res);
    }

    getProductDetailForUser = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: "Get product detail for uses successs",
            metadata: await ProductFactoryService.findProduct({product_id: req.params.product_id})
        })
        .send(res);
    }
}

const productController = new ProductController();

export default productController;