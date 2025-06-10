const User = require('../models/User');

/**
 * Enregistre un nouvel utilisateur en base
 * @param {Object} userData - { username, email, password, role }
 * @throws {Error} si email ou username déjà pris ou autre erreur DB
 * @returns {Promise<Object>} l'utilisateur créé
 */
const registerUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        // Gestion des doublons MongoDB (code 11000)
        if (error.code === 11000) {
            throw new Error('Email or username already in use.');
        }
        throw error;  // Rethrow sans modifier pour garder la stack trace
    }
};

/**
 * Recherche un utilisateur par email
 * @param {string} email - email de l'utilisateur
 * @returns {Promise<Object|null>} l'utilisateur ou null s'il n'existe pas
 * @throws {Error} en cas d'erreur DB
 */
const loginUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user; // si null, le contrôleur gèrera le cas
    } catch (error) {
        throw new Error(`An error occurred finding user: ${error.message}`);
    }
};

module.exports = { registerUser, loginUser };
