const Joi = require('joi');

/**
 * Schéma Joi pour valider la création d'une salle.
 * - name: chaîne de caractères, obligatoire, au moins 8 caractères
 * - volume: nombre, obligatoire
 * - equipments: tableau, obligatoire (liste d'équipements)
 */
const roomSchema = Joi.object({
    name: Joi.string().required().min(8),
    volume: Joi.number().required(),
    equipments: Joi.array().required()
});

/**
 * Middleware de validation des champs du body contre roomSchema.
 * En cas d'erreur, renvoie un status 400 avec un tableau des messages d'erreur.
 */
const fieldValidator = (req, res, next) => {
    const { error } = roomSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // Extraction et renvoi de tous les messages d'erreur Joi
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }

    // Validation OK, on continue
    next();
};

module.exports = { fieldValidator };
