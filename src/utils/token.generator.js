const jwt = require('jsonwebtoken');

//génération de l'access token
const generateAccessToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' });
}

//génération du refresh token
const generateRefreshToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

module.exports = { generateAccessToken, generateRefreshToken };