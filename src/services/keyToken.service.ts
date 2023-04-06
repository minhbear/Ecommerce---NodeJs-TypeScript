import { LeanKeyTokenDocument } from "@/interfaces/keyToken.interface";
import KeyTokenRepo from "@/repositories/keyToken.repo";

export default class KeyTokenService {

    public async createKeyToken(
        { shopId, publicKey, privateKey, refreshToken }
            : {
                shopId: string,
                publicKey: string,
                privateKey: string,
                refreshToken: string
            }
    ): Promise<string> {
        const filter = { shop: shopId };
        const update = {
            publicKey,
            privateKey,
            refreshTokensUsed: [],
            refreshToken
        };

        const keyTokens = await KeyTokenRepo.createKeyToken(filter, update);
        return keyTokens ? keyTokens.publicKey : null;
    }

    public async removeKeyTokenById(id: string): Promise<LeanKeyTokenDocument> {
        return await KeyTokenRepo.removeKeyTokenById(id);
    }

    public async deleteKeyByShopId(shopId: string) {
        return await KeyTokenRepo.deleteKeyTokenByShopId(shopId);
    }

    public async updateKeyTokenWithRefreshTokenUsed(accessToken: string, refreshToken: string, id: string, refreshTokenUsed: string): Promise<void> {
        const keyStore = await KeyTokenRepo.findById(id);
        await keyStore.updateOne({
            $set: {
                refreshToken: refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshTokenUsed
            }
        }).exec()
    }
}