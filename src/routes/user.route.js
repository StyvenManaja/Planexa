const express = require('express');
const userController = require('../controllers/user.controller');
const validator = require('../middlewares/validator');
const authenticate = require('../middlewares/authentication');

const router = express.Router();

//valider toutes les entrés avant de passer aux autres controller
router.post('/api/signup', validator.signupValidator, userController.registerUser);
router.post('/api/login', validator.loginValidator, userController.loginUser);

//a protected route to get the user data
router.get('/api/user', authenticate, userController.userData);

module.exports = router;