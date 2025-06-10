const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour la réservation (Booking)
 * - userId: référence vers l'utilisateur qui réserve (ObjectId)
 * - roomId: référence vers la salle réservée (ObjectId)
 * - date: date de réservation
 * - timeSlots: créneaux horaires réservés (tableau de chaînes)
 * - status: statut de la réservation, peut être 'confirmed' ou 'canceled' (par défaut 'confirmed')
 * 
 * timestamps: mongoose ajoute automatiquement createdAt et updatedAt
 */
const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: Date, required: true },
    timeSlots: { type: [String], default: [] },
    status: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' }
}, { timestamps: true });

const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;
