import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    
    donationDate:{
        type: Date,
        default: Date.now
    }
}, schemaConfig);

const model = mongoose.model('donation', Schema);

export default model;