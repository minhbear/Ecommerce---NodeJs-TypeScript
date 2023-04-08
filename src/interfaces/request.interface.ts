import { Request } from "express";
import { LeanApiKeyDocument } from "./apikey.interface";
import { LeanKeyTokenDocument } from "./keyToken.interface";
import { JwtPayload } from "@/common/type/JwtPayload";

export interface RequestAttribute extends Request{
    objKey?: LeanApiKeyDocument;
    keyStore?: LeanKeyTokenDocument;
    shop?: JwtPayload;
    refreshToken?: string;
}