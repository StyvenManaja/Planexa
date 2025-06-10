const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schéma Mongoose pour l'utilisateur
 * - username: nom unique, obligatoire, minimum 8 caractères
 * - email: email unique et obligatoire
 * - password: hashé avant sauvegarde, obligatoire
 * - role: rôle de l'utilisateur (ex: 'user', 'admin'), optionnel ici (penser à valider en amont)
 * 
 * timestamps: mongoose gère automatiquement createdAt et updatedAt
 */
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minLength: 8 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String }
}, {
    timestamps: true
});

// Middleware Mongoose : hash du password avant la sauvegarde
userSchema.pre('save', async function (next) {
    try {
        // Correction ici : isModified est une méthode, faut l'appeler !
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode d'instance pour comparer le mot de passe en login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
