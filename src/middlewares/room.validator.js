const Joi = require('joi');

//schema de validation des champs pour la création d'une salle
const roomSchema = Joi.object({
    name: Joi.string().required().min(8),
    volume: Joi.number().required(),
    equipments: Joi.array().required()
})

const fieldValidator = (req, res, next) => {
    const { error } = roomSchema.validate(req.body, { abortEarly: false });
    if(error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
}

module.exports = { fieldValidator };