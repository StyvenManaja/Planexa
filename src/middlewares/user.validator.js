const Joi = require('joi');

/**
 * Schéma de validation pour l'inscription d'un utilisateur
 */
const signupSchema = Joi.object({
    username: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('user', 'admin')
});

/**
 * Schéma de validation pour la connexion d'un utilisateur
 */
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

/**
 * Middleware générique de validation Joi
 * @param {Joi.ObjectSchema} schema - schéma Joi à utiliser pour valider req.body
 */
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

// Exports des middlewares spécifiques
const signupValidator = validate(signupSchema);
const loginValidator = validate(loginSchema);

module.exports = { signupValidator, loginValidator };
