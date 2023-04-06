import { Document, LeanDocument, Types } from "mongoose";

export interface KeyToken {
    shop: Types.ObjectId,
    publicKey: string,
    privateKey: string,
    refreshTokensUsed: Types.Array<string>
    refreshToken: string
}

export interface LeanKeyTokenDocument extends LeanDocument<KeyToken & Document>{}