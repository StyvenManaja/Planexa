const userRepository = require('../repositories/user.repository');

// Création utilisateur
const registerUser = async (username, email, password, role) => {
    try {
        const userData = { username, email, password, role };
        const user = await userRepository.registerUser(userData);

        return {
            id: user.id,
            username: user.username,
            role: user.role
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Connexion utilisateur
const loginUser = async (email, password) => {
    try {
        const user = await userRepository.loginUser(email);

        if (user && await user.matchPassword(password)) {
            return {
                id: user.id,
                username: user.username,
                role: user.role
            };
        }

        return null;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { registerUser, loginUser };
