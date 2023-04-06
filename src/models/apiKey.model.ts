import { Schema, model, Document } from "mongoose";
import { ApiKey } from "@/interfaces/apikey.interface";

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";

const apiKeySchema: Schema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    permission: {
        type: [String],
        required: true,
        enum: ["0000", "1111", "2222"],
    }, createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const apiKeyModel = model<ApiKey & Document>(DOCUMENT_NAME, apiKeySchema);

export default apiKeyModel;