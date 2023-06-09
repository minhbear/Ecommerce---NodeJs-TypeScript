import crypto from "crypto";
import lodash, { update } from "lodash";
import { verify, sign } from "jsonwebtoken";
import { AuthFailureErrorException } from "@exceptions/AuthFailureError.exception";
import { LeanKeyTokenDocument } from "@/interfaces/keyToken.interface";
import { JwtPayload } from "@/common/type/JwtPayload";
import { Types } from "mongoose";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const generateKeyPair = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");

  return {
    privateKey,
    publicKey,
  };
};

export const extractRefreshToken = (refreshToken: string, keyStore: LeanKeyTokenDocument, shopId: string) => {
  const decodedShop: JwtPayload = verify(refreshToken, keyStore.privateKey) as JwtPayload;
  if (shopId !== decodedShop.id) {
    throw new AuthFailureErrorException({ message: "Invalid user" });
  }

  return {
    decodedShop,
  };
};

export const extractAccessToken = (accessToken: string, keyStore: LeanKeyTokenDocument, shopId: string) => {
  const decodedShop: JwtPayload = verify(accessToken, keyStore.publicKey) as JwtPayload;
  if (shopId !== decodedShop.id) {
    throw new AuthFailureErrorException({ message: "Invalid user" });
  }

  return {
    decodedShop
  };
};

export const createTokenPair = (payload: JwtPayload, publicKey: string, privateKey: string) => {
  try {
    const accessToken = sign(payload, publicKey, {
      expiresIn: "2 days"
    });

    const refreshToken = sign(payload, privateKey, {
      expiresIn: '7 days'
    });

    return {
      accessToken, refreshToken
    }
  } catch (error) {

  }
}

export const getInfoData = ({ fields = [], object = {} }) => {
  return lodash.pick(object, fields);
}

export const getDataSelect = (select: string[]) => {
  return Object.fromEntries(select.map(el => [el, 1]));
}

export const getDataUnselect = (select: string[]) => {
  return Object.fromEntries(select.map(el => [el, 0]));
}

export const removeUndefinedObject = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if(obj[key] === undefined){
      delete obj[key];
    }
  });

  return obj;
}

export const updateNestedObject = (obj: any): any => {
  const final = {};
  Object.keys(obj).forEach(key => {
    if(typeof obj[key] === "object" && !Array.isArray(obj[key])){
      const response = updateNestedObject(obj[key]);
      Object.keys(response).forEach(k => {
        final[`${key}.${k}`] = response[k];
      })
    }else{
      final[key] = obj[key];
    }
  });

  return final;
}

export const convertToObjectIDMongoose = (id: string) => {
  return new Types.ObjectId(id);
}