import { Request } from "express";
import { LeanApiKeyDocument } from "./apikey.interface";
import { LeanKeyTokenDocument } from "./keyToken.interface";

export interface RequestAttribute extends Request{
    objKey?: LeanApiKeyDocument;
    keyStore?: LeanKeyTokenDocument;
    shop?: any;
    refreshToken?: string;
}