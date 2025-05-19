const User = require('../models/User');

//Une fonction pour l'enregistrement d'utilisateur
const registerUser = async (userData) => {
    try {
        const user = await User.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role
        })
        return user;
    } catch (error) {
        if(error.code === 11000) {
            throw new Error('Email or username already in use.');
        }
        throw error;
    }
}

const loginUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        if(!user) { return null };  //si l'utilisateur n'est pas trouvé
        return user;
    } catch (error) {
        throw new Error('An error occured on finding user: ', error.message);
    }
}

module.exports = { registerUser, loginUser };