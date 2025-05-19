const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/api/refresh-token', authController.refreshToken);  //rafraichir le token à son expiration
router.post('/api/logout', authController.logout);  //déconnexion de l'utilisateur

module.exports = router;