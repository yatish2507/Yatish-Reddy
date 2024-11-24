import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    category: {
        type: String
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    videoId: {
        type: String
    }
}, schemaConfig);

const model = mongoose.model('educationalResource', Schema);

export default model;