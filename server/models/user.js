const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email' //use email for login
});

module.exports = mongoose.model('User', UserSchema);