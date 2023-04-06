import { Schema } from "mongoose";

const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    
})