const express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/user.validator');
const authenticate = require('../middlewares/authentication');

const router = express.Router();

//valider toutes les entrés avant de passer aux autres controller
router.post('/api/user/signup', userValidator.signupValidator, userController.registerUser);
router.post('/api/user/login', userValidator.loginValidator, userController.loginUser);

//a protected route to get the user data
router.get('/api/user', authenticate, userController.userData);

module.exports = router;