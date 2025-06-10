const userService = require('../services/user.service');
const tokenGenerator = require('../utils/token.generator');

/**
 * Enregistre un nouvel utilisateur avec les données reçues dans le body.
 * Si la création réussit, génère et envoie les tokens d'authentification dans des cookies.
 */
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role = 'user' } = req.body;

        const user = await userService.registerUser(username, email, password, role);
        if (!user) {
            return res.status(400).json({ message: 'Cannot register user.' });
        }

        // Génération des tokens JWT
        const accessToken = tokenGenerator.generateAccessToken(user.id, user.username, user.email);
        const refreshToken = tokenGenerator.generateRefreshToken(user.id, user.username, user.email);

        // Envoi sécurisé des tokens via cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 // 24h
        });

        res.status(200).json({ message: 'User created successfully.' });

    } catch (error) {
        const status = error.message.includes('already in use') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

/**
 * Authentifie un utilisateur avec email et mot de passe.
 * Si valide, génère et envoie les tokens JWT dans les cookies.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.loginUser(email, password);
        if (!user) {
            return res.status(403).json({ message: 'Invalid credentials or user not found.' });
        }

        // Génération des tokens JWT
        const accessToken = tokenGenerator.generateAccessToken(user.id, user.username, user.email);
        const refreshToken = tokenGenerator.generateRefreshToken(user.id, user.username, user.email);

        // Envoi sécurisé des tokens via cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(200).json({ message: 'User logged in.' });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Retourne les données de l'utilisateur connecté.
 * Les infos sont injectées dans req.user par le middleware d'authentification.
 */
const userData = (req, res) => {
    try {
        const { id, username, email } = req.user;

        res.status(200).json({
            user: {
                id,
                username,
                email
            }
        });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { registerUser, loginUser, userData };