const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour une salle (Room)
 * - name: nom unique de la salle, chaîne de caractères, obligatoire, min 8 caractères
 * - volume: capacité ou taille de la salle, nombre, obligatoire, défaut 1
 * - equipments: liste des équipements disponibles dans la salle (ex: projecteur, micro)
 * - openingHour: créneaux horaires disponibles pour réservation, tableau de chaînes,
 *                avec des valeurs par défaut représentant les heures d'ouverture
 * 
 * timestamps: mongoose ajoute automatiquement createdAt et updatedAt
 */
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minLength: 8 },
    volume: { type: Number, required: true, default: 1 },
    equipments: { type: [String], default: [] },
    openingHour: {
        type: [String],
        default: [
            '8h-9h',
            '9h-10h',
            '10h-11h',
            '11h-12h',
            '12h-13h',
            '13h-14h',
            '14h-15h',
            '15h-16h',
            '16h-17h'
        ]
    }
}, {
    timestamps: true
});

const room = mongoose.model('Room', roomSchema);

module.exports = room;
