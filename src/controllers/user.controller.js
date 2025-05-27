const userService = require('../services/user.service');
const tokenGenerator = require('../utils/token.generator');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role = 'user' } = req.body;
        const user = await userService.registerUser(username, email, password, role);
        if(!user) {
            return res.status(400).json({ message: 'Can not register user.' });
        }
        //génération des tokens utils
        const accessToken = tokenGenerator.generateAccessToken(user.username, user.email);
        const refreshToken = tokenGenerator.generateRefreshToken(user.username, user.email);

        //envoi des tokens au frontend dans les cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24
        })

        res.status(200).json({ message: 'User created successfully.' });

    } catch (error) {
        const status = error.message.includes('already in use') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if(!user) {
            return res.status(403).json({ message: 'User not found.' });
        }

        //génération des tokens utils
        const accessToken = tokenGenerator.generateAccessToken(user.username, user.email);
        const refreshToken = tokenGenerator.generateRefreshToken(user.username, user.email);

        //envoi des tokens au frontend dans les cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24
        })

        res.status(200).json({ message: 'User logged in.' });
    } catch (error) {
        console.log('Server error: ', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const userData = (req, res) => {
    try {
        // `username` et `email` injectés dans req par le middleware d'authentification
        const username = req.username;
        const email = req.email;
        res.status(200).json({
            user: {
                username: username,
                email: email
            }
        })
    } catch (error) {
        console.log('Server error: ', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { registerUser, loginUser, userData };