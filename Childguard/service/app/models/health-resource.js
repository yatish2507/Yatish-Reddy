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
    pdf: {
        type: String
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
}, schemaConfig);

const model = mongoose.model('healthResource', Schema);

export default model;