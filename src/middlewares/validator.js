const Joi = require('joi');

//le schema de validation à la création d'un utilisateur
const signupSchema = Joi.object({
    username: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('user', 'admin')
})

//schema de validation à la connection d'un utilisateur
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

//iddlewares de validation des données
const signupValidator = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if(error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) }); //récuperer toutes les erreurs et l'envoyer
    }
    next();
}

const loginValidator = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if(error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
}

module.exports = { signupValidator, loginValidator };