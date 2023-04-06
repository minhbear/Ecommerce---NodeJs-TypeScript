import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import { Created } from '@/responses/Created.response';
import { CreateShopDto, LoginShopDto } from '@/dtos/shop.dto';
import { OK } from '@/responses/Ok.response';
import { RequestAttribute } from '@/interfaces/request.interface';
import { SuccessResponse } from '@/responses/success.response';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createShopDto: CreateShopDto = req.body;
      new Created({
        message: "Registered OK!",
        metadata: await this.authService.signUp(createShopDto)
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginShopDto: LoginShopDto = req.body;
      new OK({
        message: "Login success",
        metadata: await this.authService.login(loginShopDto)
      }).send(res)
    } catch (error) {
      next(error);
    }
  }

  public logout = async (req: RequestAttribute, res: Response, next: NextFunction) => {
    try {
      new OK({
        message: "logout success",
        metadata: await this.authService.logout(req.keyStore)
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  public handleRefreshToken = async (req: RequestAttribute, res: Response, next: NextFunction) => {
    try {
      new SuccessResponse({
        message: "Get Tokens success",
        metadata: await this.authService.handleRefreshToken({
          refreshToken: req.refreshToken,
          shop: req.shop,
          keyStore: req.keyStore
        })
      }).send(res);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
