const User = require('../models/User');
const userService = require('../services/user.service');
const { getRandomString } = require('../utils/generateToken');
const { comparePassword, securePassword } = require('../utils/securePassword');
const { sendResetEmail } = require('../utils/sendResetEmail');
const { sendVerificationEmail } = require('../utils/sendVerificationEmail');

// POST /users

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const profilePicture = req.file.filename;
        const password = await securePassword(req.body.password);

        const user = new User({
            firstName,
            lastName,
            email,
            password,
            profilePicture
        });

        const userData = await userService.create(user);
        sendVerificationEmail(userData.email, userData.firstName, userData._id);
        res.redirect('http://localhost:4000/login');
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// PUT /users/:userId

const updateUser = async (req, res) => {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = await userService.update(userId, update);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// DELETE /users/:userId

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.status(204).end();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// GET /users/:userId

const findById = async (req, res) => {
    try {
        res.json(await userService.findById(req.params.userId));
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// GET /users

const findAll = async (req, res) => {
    try {
        res.json(await userService.findAll());
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

// POST /users/login

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if (userData) {
            const isMatched = await comparePassword(password, userData.password);
            if (isMatched) {
                if (userData.isVerified) {
                    req.session.userId = userData._id;
                    res.redirect('http://localhost:4000/');
                } else res.send({ message: 'Email address is not verified' });
            } else {
                res.status(200).send({ message: 'Email or password incorrect' });
            }
        } else {
            res.status(404).send({ message: 'Email or password incorrect' });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('http://localhost:4000/login');
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const id = req.query.id;
        await User.updateOne(
            { _id: id },
            {
                $set: {
                    isVerified: 1
                }
            }
        );
        res.redirect('http://localhost:4000/verification');
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            if (userData.isVerified) {
                res.send({ message: 'User is already verified' });
            } else {
                sendVerificationEmail(userData.email, userData.firstName, userData._id);
                res.redirect('http://localhost:4000/login');
            }
        } else {
            res.status(404).send({
                message: 'User with this email does not exist'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            if (userData.isVerified) {
                const randomString = getRandomString();
                await User.updateOne(
                    { email: email },
                    {
                        $set: {
                            token: randomString
                        }
                    }
                );
                sendResetEmail(userData.email, userData.firstName, userData.id, randomString);
                res.send({ message: 'Password reset link sent' });
            } else {
                res.send({ message: 'Please verify your email address first' });
                res.redirect('http://localhost:4000/login');
            }
        } else {
            res.status(404).send({
                message: 'User with this email does not exist'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const loadResetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        const userData = await User.findOne({ token: token });
        if (userData) {
            res.redirect(`http://localhost:4000/resetpassword/${userData._id}`);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const password = req.body.password;
        console.log(password);
        const userId = req.body.userId;
        console.log(userId);

        const hashPassword = await securePassword(password);

        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    password: hashPassword,
                    token: ''
                }
            }
        );
        res.redirect('http://localhost:4000/login');
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const showProfile = async (req, res) => {
    try {
        const id = req.session.userId;
        console.log(id);
        const userData = await User.findOne({ _id: id });
        if (userData) {
            res.redirect(`http://localhost:4000/profile/${id}`);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    findById,
    findAll,
    loginUser,
    logoutUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    loadResetPassword,
    resetPassword,
    showProfile
};
