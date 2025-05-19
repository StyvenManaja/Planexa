const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/token.generator');

//quand le token expire, on le rafraîchi avec cette controller
const refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if(!refreshToken) {
            return res.status(403).json({ message: 'No token found.' });
        }
        //vérifie si le token est toujours valid
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if(err) {
                return res.status(403).json({ message: 'Expires or invalid token.' });
            }
            //si valid, on génère un autre access token et l'envoi dans les cookies
            const newAccessToken = tokenGenerator.generateAccessToken(data.username, data.email);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 15
            })

            res.status(200).json();
        })
    } catch (error) {
        console.log('Server error: ', error.message);
        return res.status(500).json({ message: 'Internal server errror.' });
    }
}

//déconnexion de l'utilisateur
const logout = (req, res) => {
    //suppression de l'access et du refresh token dans les cookies
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
}

module.exports = { refreshToken, logout };