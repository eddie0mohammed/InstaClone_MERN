
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



// @route   GET /auth/:userId
// @desc    get user
// @access  Private
router.get('/validate/:token', authController.activateUser);





module.exports = router;