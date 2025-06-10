const express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../middlewares/user.validator');
const authenticate = require('../middlewares/authentication');

const router = express.Router();

// Validation des données avant inscription
router.post('/api/user/signup', userValidator.signupValidator, userController.registerUser);

// Validation des données avant connexion
router.post('/api/user/login', userValidator.loginValidator, userController.loginUser);

// Route protégée : récupération des infos utilisateur
router.get('/api/user', authenticate, userController.userData);

module.exports = router;
