import { Types, LeanDocument, Document } from "mongoose";

export interface ApiKey {
    _id: string;
    key: string;
    status: boolean;
    permission: Types.Array<string>,
}

export interface LeanApiKeyDocument extends LeanDocument<ApiKey & Document> {}