import { CreateDiscountCodeDto, FilterDiscountByShop, FilterDiscountDto, GetAmountApplyDiscount, UpdateDiscountCodeDto } from "@/dtos/discount.dto";
import { RequestAttribute } from "@/interfaces/request.interface";
import { SuccessResponse } from "@/responses/success.response";
import { DiscountService } from "@/services/discount/discount.service";
import { NextFunction, Response } from "express";

class DiscountController {
    private discountService = new DiscountService();

    createDiscountCode = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            const dto: CreateDiscountCodeDto = {
                ...req.body,
                shopId: req.shop.id
            };

            new SuccessResponse({
                message: "Create discount code success",
                metadata: await this.discountService.createDiscountCode(dto)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    updateDiscountCode = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            const dto: UpdateDiscountCodeDto = {
                ...req.body,
                shopId: req.shop.id
            };

            new SuccessResponse({
                message: "Update discount code success",
                metadata: await this.discountService.updateDiscountCode(dto, req.params.id)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    getAllDiscountCodeWithProduct = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            const dto: FilterDiscountDto = {
                ...req.body,
            }

            new SuccessResponse({
                message: "get discount code with product success",
                metadata: await this.discountService.getAllDiscountCodeWithProduct(dto)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    getAllDiscountCodeByShop = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            const dto: FilterDiscountByShop = {
                ...req.body,
                shopId: req.params.id
            }

            new SuccessResponse({
                message: "get discount code with product success",
                metadata: await this.discountService.getAllDiscountByShop(dto)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }

    getAmountApplyDiscount = async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try {
            const dto: GetAmountApplyDiscount = {
                ...req.body,
            }

            new SuccessResponse({
                message: "get amount apply discount success",
                metadata: await this.discountService.getDiscountAmount(dto)
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}

const discountController = new DiscountController();

export default discountController;
