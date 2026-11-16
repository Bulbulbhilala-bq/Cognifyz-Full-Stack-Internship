
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

// Export User Model
module.exports = mongoose.model("User", userSchema);
