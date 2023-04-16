import { HEADER } from "@/common/enum/req-header";
import { AuthFailureErrorException } from "@/exceptions/AuthFailureError.exception";
import { NotFoundErrorException } from "@/exceptions/NotFoundError.exception";
import { LeanKeyTokenDocument } from "@/interfaces/keyToken.interface";
import { RequestAttribute } from "@/interfaces/request.interface";
import KeyTokenRepo from "@/repositories/keyToken.repo";
import { extractAccessToken, extractRefreshToken } from "@/utils/util";
import { NextFunction, Response } from "express";

export const authentication = async (req: RequestAttribute, res: Response, next: NextFunction) => {
    const shopId: string = req.headers[HEADER.CLIENT_ID] as string;
    if(!shopId) {
        throw new AuthFailureErrorException({ message: "Invalid Request" });
    }

    const keyStore: LeanKeyTokenDocument = await KeyTokenRepo.findByShopId(shopId);
    if(!keyStore) {
        throw new NotFoundErrorException({message: 'Not found key store'});
    }

    if(req.headers[HEADER.REFRESH_TOKEN]) {
        try {
            const refreshToken: string = req.headers[HEADER.REFRESH_TOKEN] as string;
            const { decodedShop } = extractRefreshToken(refreshToken, keyStore, shopId);

            req.keyStore = keyStore;
            req.shop = decodedShop;
            req.refreshToken = refreshToken;

            return next();
        } catch (error) {
            next(error);
        }
    }

    const accessToken: string = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) {
        throw new AuthFailureErrorException({ message: "Invalid Request" });
    }

    try {
        const { decodedShop } = extractAccessToken(accessToken, keyStore, shopId);
        req.keyStore = keyStore;
        req.shop = decodedShop;

        return next();
    } catch (error) {
        throw error;
    }
}