import { Request } from "express";
import { LeanApiKeyDocument } from "./apikey.interface";

export interface RequestAttribute extends Request{
    objKey? : LeanApiKeyDocument;
}