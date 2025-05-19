const userRepository = require('../repositories/user.repository');

//création de l'utilisateur
const registerUser = async (username, email, password, role) => {
    try {
        const userData = {
            username: username,
            email: email,
            password: password,
            role: role
        }
    
        const user = await userRepository.registerUser(userData);
        return {
            username: user.username,
            email: user.email
        }
    } catch (error) {
        throw new Error('Error: ' + error.message);
    }
}

//connexion de l'utilisateur
const loginUser = async (email, password) => {
    try {
        const user = await userRepository.loginUser(email);
        if(user && (await user.matchPassword(password))) {  //vérifie si l'utilisateur existe et si le mdp est bon
            return {
                username: user.username,
                email: user.email
            }
        } else {
            return null;    //si non, on renvoi rien
        }
    } catch (error) {
        throw new Error('Error: ' + error.message);
    }
}

module.exports = { registerUser, loginUser };