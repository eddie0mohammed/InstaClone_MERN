
const express = require('express');

const authController = require('../controllers/authController');

const checkAuth = require('../middleware/checkAuth');


const router = express.Router();




// @route   POST /auth
// @desc    create new user
// @access  PUBLIC
router.post('/', authController.register);


// @route   POST /auth/login
// @desc    create new user
// @access  PUBLIC
router.post('/login', authController.login);


// @route   GET /auth/:userId
// @desc    get user
// @access  Private
router.get('/', checkAuth, authController.getUser);



// @route   GET /auth/validated:token
// @desc    validate token and activate account
// @access  Private
router.get('/validate/:token', authController.activateUser);


// @route   POST /auth/forgotPassword
// @desc    forgot password
// @access  Public
router.post('/forgotPassword', authController.forgotPassword);



// @route   GET /auth/resetPassword/:token
// @desc    Redirect to reset password page
// @access  Private
router.get('/resetPassword/:token', authController.redirectToResetPasswordPage);


// @route   POST /auth/resetPassword/:token
// @desc    forgot password
// @access  Private
router.post('/resetPassword/:token', authController.resetPassword);


module.exports = router;