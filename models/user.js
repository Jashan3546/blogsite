const mongoose = require('mongoose');
const uuid = require('uuid');
var cryptoJs = require('crypto-js');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true
        },
        name: String,
        email: String,
        ency_password: String,
        salt: String,

    },
    { timestamps: true }
);

userSchema.virtual('password').set(function (plainpassword) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(plainpassword);
})

userSchema.methods = {
    securePassword: function (plainpassword) {
        return cryptoJs.SHA256(plainpassword, this.salt).toString()
    },

    isAuthenticated: function (plainpassword) {
        return this.ency_password === this.securePassword(plainpassword);
    }
}

const user = mongoose.model('User', userSchema);
module.exports = user;