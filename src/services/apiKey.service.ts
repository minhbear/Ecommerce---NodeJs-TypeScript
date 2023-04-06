import apiKeyModel from "@/models/apiKey.model";
import crypto from "crypto";

const findById = async ( key: string ) => {
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean().exec();

    return objKey;
}

const createApiKey = async () => {
    const objKey = crypto.randomBytes(64).toString('hex');

    return await apiKeyModel.create({ key: objKey });
}

export {
    findById,
    createApiKey
}