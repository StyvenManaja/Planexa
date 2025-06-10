const jwt = require('jsonwebtoken');

//génération de l'access token
const generateAccessToken = (id, username, email) => {
    return jwt.sign({ id, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' });
}

//génération du refresh token
const generateRefreshToken = (id, username, email) => {
    return jwt.sign({ id, username, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

module.exports = { generateAccessToken, generateRefreshToken };