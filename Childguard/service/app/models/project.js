import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean
    },
    img: {
        type: String
    }
}, schemaConfig);

const model = mongoose.model('project', Schema);

export default model;