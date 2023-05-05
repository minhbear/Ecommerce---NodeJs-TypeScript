import { RequestAttribute } from "@/interfaces/request.interface";
import { SuccessResponse } from "@/responses/success.response";
import { CartService } from "@/services/cart.service";
import { NextFunction, Response } from "express";

export class CartController {
    addToCart = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            new SuccessResponse({
                message: "create new cart success",
                metadata: await CartService.addToCart(req.body)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            new SuccessResponse({
                message: "create new cart success",
                metadata: await CartService.addToCartV2(req.body)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            new SuccessResponse({
                message: "delete cart success",
                metadata: await CartService.deleteUserCart(req.body)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    listToCart = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            new SuccessResponse({
                message: "list cart success",
                metadata: await CartService.getListUserCart(req.query.userId)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}