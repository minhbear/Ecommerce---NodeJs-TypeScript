import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';
import ProductController from '@/controllers/product.controller';
import { CreateProductDto } from '@/dtos/product.dto';

class ProductRoute implements Routes {
  public path = '/v1/api/products/';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use( asyncHandler(authentication) );
    
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.productController.createProduct);
    this.router.post(`${this.path}publish/:id`, this.productController.publishProductByShop);  
    this.router.post(`${this.path}unpublish/:id`, this.productController.unPublishProductByShop);    

    this.router.get(`${this.path}drafts/all`, this.productController.getAllDraftForShop);
    this.router.get(`${this.path}published/all`, this.productController.getAllPublishedForShop);
  }
}

export default ProductRoute;
