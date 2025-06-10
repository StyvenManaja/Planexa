const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/token.generator');

/**
 * Rafraîchit le token d'accès (accessToken) si le refreshToken est valide.
 * Vérifie la présence du refreshToken dans les cookies, le valide, puis génère un nouveau accessToken.
 */
const refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // Aucun token trouvé : accès refusé
        if (!refreshToken) {
            return res.status(403).json({ message: 'No token found.' });
        }

        // Vérifie la validité du refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ message: 'Expired or invalid token.' });
            }

            // Token valide : génération d'un nouveau accessToken
            const newAccessToken = tokenGenerator.generateAccessToken(data.username, data.email);

            // Envoi du nouveau token dans un cookie sécurisé
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 15 // 15 minutes
            });

            res.status(200).json(); // Réponse OK sans body
        });
    } catch (error) {
        console.error('Server error:', error.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Déconnecte l'utilisateur en supprimant les cookies liés à l'authentification.
 */
const logout = (req, res) => {
    // Suppression des tokens d'authentification
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });

    res.status(200).json({ message: 'User logged out successfully.' });
};

module.exports = { refreshToken, logout };
