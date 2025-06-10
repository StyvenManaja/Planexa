const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification.
 * Vérifie la présence et la validité de l'accessToken dans les cookies.
 * Si le token est valide, ajoute les infos utilisateur dans req.user.
 * Sinon, retourne une erreur 401 (pas de token) ou 403 (token invalide).
 */
const authenticate = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(401).json({ message: 'No token found.' });
        }

        // Vérifie la validité du JWT
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ message: 'Expired or invalid token.' });
            }

            // Injection des infos utilisateur dans la requête
            req.user = data;
            next();
        });
    } catch (error) {
        // Lancer l’erreur au prochain middleware d’erreur global
        throw new Error(`An error occurred: ${error.message}`);
    }
};

module.exports = authenticate;
