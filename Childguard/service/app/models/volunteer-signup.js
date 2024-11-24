import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    signUpDate: {
        type: Date,
        default: Date.now
    }
}, schemaConfig);

const model = mongoose.model('volunteerSignup', Schema);

export default model;