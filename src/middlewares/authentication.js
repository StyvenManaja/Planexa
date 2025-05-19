const jwt = require('jsonwebtoken');

//middleware d'authentification qui vérifie le token
const authenticate = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if(!accessToken) {
            return res.status(403).json({ message: 'No token found.' });
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if(err) {
                return res.status(403).json({ message: 'Expires or invalid token.' });
            }
            //récuperation des données encoder
            req.username = data.username;
            req.email = data.email;
            next();
        })
    } catch (error) {
        throw new Error('An error occured: ', error.message);
    }
}

module.exports = authenticate;