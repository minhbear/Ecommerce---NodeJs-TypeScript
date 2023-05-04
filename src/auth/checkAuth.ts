import { ForBiddenException } from "@/exceptions/ForbiddenError.exception";
import { HttpException } from "@/exceptions/HttpException";
import { LeanApiKeyDocument } from "@/interfaces/apikey.interface";
import { RequestAttribute } from "@/interfaces/request.interface";
import { findById } from "@/services/apiKey.service";
import { NextFunction, Response } from "express"

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const returnException = (res: Response, exception: HttpException) => {
    return res.status(exception.status).json({
        status: "error",
        code: exception.status,
        message: exception.message,
    });
}

const apiKey = () => {
    return async (req: RequestAttribute, res: Response, next: NextFunction) => {
        try{
            const key = req.headers[HEADER.API_KEY]?.toString();
            if (!key) {
                const exception = new ForBiddenException({});
                returnException(res, exception);
            }
    
            const objKey: LeanApiKeyDocument = await findById(key);
            if (!objKey) {
                const exception = new ForBiddenException({});
                returnException(res, exception);
            }
    
            req.objKey = objKey;
            return next();
        }catch(error) {
            const exception = new ForBiddenException({});
            returnException(res, exception);
        }
    }
}

const permission = (permission: string) => {
    return async (req: RequestAttribute, res: Response, next: NextFunction) => {
        if (!req.objKey.permission) {
            const exception = new ForBiddenException({});
            returnException(res, exception);
        }
        const validPermission: boolean = req.objKey.permission.includes(permission);
        if(!validPermission) {
            const exception = new ForBiddenException({});
            returnException(res, exception);
        }

        return next();
    }
}

export {
    apiKey,
    permission
}