const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "Toramaike";
const SelleruserSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [3, 'First name must be at least 3 characters long'],
            },
            lastname: {
                type: String,
                minlength: [3, 'Last name must be at least 3 characters long'],
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [5, 'Email must be at least 5 characters long'],
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
            lowercase: true, // Ensures email is stored in lowercase
        },
        password: {
            type: String,
            required: true,
            select: false, // Ensures password is not returned in queries by default
        },
        socketId: {
            type: String,
            default: null,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
SelleruserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id },SECRET_KEY, { expiresIn: '24h' });
};

SelleruserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

SelleruserSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const SelleruserModel = mongoose.model('Selleruser', SelleruserSchema);

module.exports = SelleruserModel;