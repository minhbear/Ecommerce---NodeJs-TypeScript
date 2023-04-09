import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';
import productController from '@/controllers/product.controller';
import { CreateProductDto } from '@/dtos/product.dto';
import { FilterProductsDto, ProductSelectQuery } from '@/dtos/product-filter.dto';


const router = Router();

router.get(`/search/:keySearch`, productController.searchProductByUser)
router.get(`/`, validationMiddleware(FilterProductsDto, 'query'), validationMiddleware(ProductSelectQuery, 'body'), productController.getAllProductsForUser);
router.get(`/:product_id`,  productController.getProductDetailForUser);

router.use(asyncHandler(authentication));

router.post(`/`, validationMiddleware(CreateProductDto, 'body'), productController.createProduct);
router.post(`/publish/:id`, productController.publishProductByShop);
router.post(`/unpublish/:id`, productController.unPublishProductByShop);

router.get(`/drafts/all`, productController.getAllDraftForShop);
router.get(`/published/all`, productController.getAllPublishedForShop);

module.exports = router;