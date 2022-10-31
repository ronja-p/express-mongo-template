const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [2, 'First name must be at least 2 characters'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [2, 'Last name must be at least 2 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters']
    },
    profilePicture: {
        type: String,
        required: [true, 'Profile picture is required'],
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('User', userSchema);
