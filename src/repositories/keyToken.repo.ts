import { LeanKeyTokenDocument } from "@/interfaces/keyToken.interface";
import keyTokenModel from "@/models/keyToken.model";

export default class KeyTokenRepo {
    static async createKeyToken(
        filter: {
            shop: string
        },
        update: {
            publicKey?: string,
            privateKey?: string,
            refreshTokensUsed?: string[],
            refreshToken?: string
        }): Promise<LeanKeyTokenDocument> {

        return await keyTokenModel.findOneAndUpdate(filter, update, { upsert: true, new: true }).exec();
    }

    static async findByShopId( shopId: string ): Promise<LeanKeyTokenDocument> {
        return await keyTokenModel.findOne({ shop: shopId }).lean().exec();
    }

    static async removeKeyTokenById(id: string): Promise<LeanKeyTokenDocument> {
        return await keyTokenModel.findByIdAndRemove(id).lean().exec();
    } 

    static async deleteKeyTokenByShopId(shopId: string){
        return await keyTokenModel.deleteOne({ shop: shopId }).exec();
    }

    static async findById(id: string){
        return await keyTokenModel.findById(id).exec();
    }
}