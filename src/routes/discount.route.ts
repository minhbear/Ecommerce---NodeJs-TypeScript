import { Router } from "express";
import validationMiddleware from '@middlewares/validation.middleware';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';
import discountController from "@/controllers/discount.controller";
import { CreateDiscountCodeDto, FilterDiscountByShop, FilterDiscountDto, GetAmountApplyDiscount, UpdateDiscountCodeDto } from "@/dtos/discount.dto";

const router = Router();

router.post('/amount', validationMiddleware(GetAmountApplyDiscount, 'body'), discountController.getAmountApplyDiscount);
router.get('/products', validationMiddleware(FilterDiscountDto, 'body'), discountController.getAllDiscountCodeWithProduct)
router.get('/shop/:id', validationMiddleware(FilterDiscountByShop, 'body'), discountController.getAllDiscountCodeByShop)

router.use(asyncHandler(authentication));

router.post(`/`, validationMiddleware(CreateDiscountCodeDto, 'body') , discountController.createDiscountCode);
router.patch(`/:id`, validationMiddleware(UpdateDiscountCodeDto, 'body'), discountController.updateDiscountCode);

module.exports = router;