import { Router } from 'express';
import authController from '@controllers/auth.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateShopDto, LoginShopDto } from '@/dtos/shop.dto';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';

const router = Router();

router.post(`/login`, validationMiddleware(LoginShopDto, 'body'), authController.login);
router.post(`/signup`, validationMiddleware(CreateShopDto, 'body'), authController.signUp);
router.use(asyncHandler(authentication));
router.post(`/logout`, authController.logout);
router.post(`/handleRefreshToken`, authController.handleRefreshToken);

module.exports = router;
