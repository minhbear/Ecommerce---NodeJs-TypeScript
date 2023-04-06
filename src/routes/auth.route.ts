import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateShopDto, LoginShopDto } from '@/dtos/shop.dto';
import { authentication } from '@/middlewares/auth.middleware';
import asyncHandler from '@/helpers/asyncHandle';

class AuthRoute implements Routes {
  public path = '/shop/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateShopDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginShopDto, 'body'), this.authController.login);

    this.router.use( asyncHandler(authentication) );

    this.router.post(`${this.path}logout`, this.authController.logout);
    this.router.post(`${this.path}handleRefreshToken`, this.authController.handleRefreshToken);
  }
}

export default AuthRoute;
