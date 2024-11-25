const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        trim: true
    },
    localisation: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    verificationCode: {
        type: String,
        trim: true
    },
    userType: {
        type: String,
        trim: true
    },
});

// Ajout de méthodes de schéma utilisateur
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};


module.exports = mongoose.model('User', UserSchema);
