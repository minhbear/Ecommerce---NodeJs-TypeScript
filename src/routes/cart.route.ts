import { Router } from "express";
import validationMiddleware from '@middlewares/validation.middleware';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';
import { CartController } from "@/controllers/cart.controller";

const router = Router();
const cartController = new CartController();

router.post('', cartController.addToCart);
router.delete('', cartController.delete);
router.post('/update', cartController.update);
router.get('', cartController.listToCart);

router.use(asyncHandler(authentication));

module.exports = router;