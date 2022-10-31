const User = require('../models/User');
const fs = require('fs');
const path = require('path');
// import * as fs from 'fs';

const create = async (user) => {
    return user.save();
};

const findById = async (userId) => {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
        throw 'User not found';
    }

    return foundUser;
};

const findAll = async () => {
    return User.find().sort({ firstName: 1 });
};

const update = async (userId, update) => {
    const foundUser = await User.findByIdAndUpdate(userId, update, {
        new: true
    });

    if (!foundUser) {
        throw 'User not found';
    }

    return foundUser;
};

const deleteUser = async (userId) => {
    const foundUser = await User.findByIdAndDelete(userId);

    if (!foundUser) {
        throw 'User not found';
    }

    const profilePicturePath = path.join(__dirname, '../public/images/users/') + foundUser.profilePicture;

    fs.access(profilePicturePath, (err) => {
        if (err) {
            console.log('Profile picture doesnt exist');
        } else {
            fs.unlink(profilePicturePath, (error) => {
                if (error) throw error;
                console.log('Profile picture was deleted');
            });
        }
    });

    return foundUser;
};

module.exports = {
    create,
    findById,
    findAll,
    update,
    deleteUser
};
