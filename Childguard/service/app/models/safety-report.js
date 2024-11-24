import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    reportDate: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    type: {
        type: String,
    },
    comments: {
        type: String,
    }
}, schemaConfig);

const model = mongoose.model('safetyreport', Schema);

export default model;