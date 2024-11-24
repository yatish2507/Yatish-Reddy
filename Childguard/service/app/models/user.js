import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import schemaConfig from './schema-config.js';

const termSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    userrole: {
        type: String,
        enum: ['USER', 'ADMIN'],
        required: true
    }
}, schemaConfig);

termSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const Term = mongoose.model('user', termSchema);

export default Term;