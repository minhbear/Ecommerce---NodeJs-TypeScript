import { ApiKeyInvalidException } from "@/exceptions/ApiKeyInvalid.exception";
import { HttpException } from "@/exceptions/HttpException";
import { PermissionInvalidException } from "@/exceptions/PermissionInvalid.exception";
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
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            const exception = new ApiKeyInvalidException();
            returnException(res, exception);
        }

        const objKey: LeanApiKeyDocument = await findById(key);
        if (!objKey) {
            const exception = new ApiKeyInvalidException();
            returnException(res, exception);
        }

        req.objKey = objKey;
        return next();
    }
}

const permission = (permission: string) => {
    return async (req: RequestAttribute, res: Response, next: NextFunction) => {
        if (!req.objKey.permission) {
            const exception = new PermissionInvalidException();
            returnException(res, exception);
        }
        const validPermission: Boolean = req.objKey.permission.includes(permission);
        if(!validPermission) {
            const exception = new PermissionInvalidException();
            returnException(res, exception);
        }

        return next();
    }
}

export {
    apiKey,
    permission
}