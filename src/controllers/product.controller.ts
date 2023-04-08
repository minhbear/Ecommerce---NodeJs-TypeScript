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
}

export default ProductController;