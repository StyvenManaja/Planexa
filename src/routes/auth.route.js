const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Route pour rafraîchir le token JWT à expiration
router.get('/api/refresh-token', authController.refreshToken);

// Route pour déconnecter l'utilisateur (clear cookies)
router.post('/api/user/logout', authController.logout);

module.exports = router;
