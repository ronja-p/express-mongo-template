const express = require('express');

const upload = require('../middlewares/uploadFile');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');

const {
    createUser,
    deleteUser,
    findAll,
    findById,
    updateUser,
    loginUser,
    logoutUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    loadResetPassword,
    resetPassword,
    showProfile
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', isLoggedIn, findAll);
router.get('/profile', isLoggedIn, showProfile);
router.post('/login', loginUser);
router.get('/logout', isLoggedOut, logoutUser);
router.get('/verify', isLoggedOut, verifyEmail);
router.post('/resendverification', isLoggedOut, resendVerificationEmail);
router.post('/forgotpassword', isLoggedOut, forgotPassword);
router.get('/resetpassword', isLoggedOut, loadResetPassword);
router.post('/resetpassword', isLoggedOut, resetPassword);
router.get('/:userId', findById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.post('/', upload.single('profilePicture'), createUser);

module.exports = router;
