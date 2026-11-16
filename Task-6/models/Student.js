
const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    }

}, { timestamps: true });

// Export Student Model
module.exports = mongoose.model("Student", studentSchema);
