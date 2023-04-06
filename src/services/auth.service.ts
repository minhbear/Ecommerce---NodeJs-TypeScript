import { hash, compare } from 'bcrypt';
import { createTokenPair, generateKeyPair, getInfoData } from '@utils/util';
import { CreateShopDto, LoginShopDto, ReturnShopDto } from '@/dtos/shop.dto';
import { LeanShopDocument } from '@/interfaces/shop.interface';
import { BadRequestErrorException } from '@/exceptions/BadRequestError.exception';
import { Role } from '@/common/enum/role';
import KeyTokenService from './keyToken.service';
import ShopService from './shop.service';
import { AuthFailureErrorException } from '@/exceptions/AuthFailureError.exception';
import { LeanKeyTokenDocument } from '@/interfaces/keyToken.interface';
import { JwtPayload } from '@/common/type/JwtPayload';
import { ForBiddenException } from '@/exceptions/ForbiddenError.exception';
import ShopRepo from '@/repositories/shop.repo';

class AuthService {
  private shopService = new ShopService();
  private keyTokenService = new KeyTokenService();

  public async signUp({ email, name, password }: CreateShopDto): Promise<ReturnShopDto> {
    const holderShop: LeanShopDocument = await this.shopService.findShopByEmail({ email });

    if (holderShop) {
      throw new BadRequestErrorException({ message: "Shop already register" })
    }

    const passwordHash = await hash(password, 10);

    const newShop: LeanShopDocument = await this.shopService.createShop({ name, email, password: passwordHash, roles: [Role.SHOP] });

    const { privateKey, publicKey } = generateKeyPair();
    const tokens = createTokenPair(
      { id: newShop._id, email },
      publicKey,
      privateKey
    );
    
    const keyStore = await this.keyTokenService.createKeyToken({
      shopId: newShop._id,
      publicKey,
      privateKey, 
      refreshToken: tokens.refreshToken
    });

    if(!keyStore) {
      throw new BadRequestErrorException({message: "Error: Keystore error"});
    }

    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: newShop
      }) as { _id: string, name: string, email: string } ,
      tokens
    }
  }

  public async login({ email, password }: LoginShopDto): Promise<ReturnShopDto> {
    const foundShop: LeanShopDocument = await this.shopService.findShopByEmail({ email });
    if(!foundShop) {
      throw new BadRequestErrorException({ message: "Shop not registered" });
    }

    const match: boolean = await compare(password, foundShop.password);
    if(!match) {
      throw new AuthFailureErrorException({ message: "Authentication error" });
    }

    const { privateKey, publicKey } = generateKeyPair();
    const tokens = createTokenPair(
      { id: foundShop._id, email },
      publicKey, 
      privateKey
    );

    const keyStore = await this.keyTokenService.createKeyToken({
      shopId: foundShop._id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    });

    if(!keyStore) {
      throw new BadRequestErrorException({message: "Error: Keystore error"});
    }

    return {
      shop: getInfoData({
        fields: ["_id", "email", "name"],
        object: foundShop
      }) as { _id: string, name: string, email: string },
      tokens
    }
  }

  public async logout(keyStore: LeanKeyTokenDocument): Promise<LeanKeyTokenDocument> {
    const delKey: LeanKeyTokenDocument = await this.keyTokenService.removeKeyTokenById(keyStore._id);
    return delKey;
  }

  public async handleRefreshToken({ refreshToken, shop, keyStore }: {refreshToken: string, shop: JwtPayload, keyStore: LeanKeyTokenDocument}) {
    const { email, id } = shop;

    /**
     * If refresh token is in the list of refreshToken used, server can hanlde this to protect the system
     * In this case we delete all key
     */
    if(keyStore.refreshTokensUsed.includes(refreshToken)) {
      await this.keyTokenService.deleteKeyByShopId(id);
      throw new ForBiddenException({message: "Sommthing wrong happened, please relogin!!!"});
    }

    if(keyStore.refreshToken !== refreshToken){
      throw new AuthFailureErrorException({message: "Shop not register"});
    }

    const foundShop: LeanShopDocument = await ShopRepo.findShopById({_id: id});

    if(!foundShop) {
      throw new AuthFailureErrorException({message: "Shop not register"});
    }

    // Create new keytoken pair
    const tokens = createTokenPair(
      { id, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    // Update token
    await this.keyTokenService.updateKeyTokenWithRefreshTokenUsed(tokens.accessToken, tokens.refreshToken, keyStore._id, refreshToken);

    return {
      shop, 
      tokens
    }
  }
}

export default AuthService;
