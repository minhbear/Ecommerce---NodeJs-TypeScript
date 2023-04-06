import { KeyToken } from '@/interfaces/keyToken.interface';
import { Schema, model, Document } from 'mongoose'; 

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const keyTokenSchema = new Schema({
    shop:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey:{
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    refreshTokensUsed:{
        type: Array,
        default: [] // List of refershToken had used
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

const keyTokenModel = model<KeyToken & Document>(DOCUMENT_NAME, keyTokenSchema);

export default keyTokenModel;