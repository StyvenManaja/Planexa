const Booking = require('../models/Booking');
const Room = require('../models/Room');

/**
 * Crée une réservation pour un utilisateur dans une salle à une date et créneaux donnés.
 * @param {Object} bookingData - { userId, roomId, date, timeSlots }
 * @returns {Object} - La réservation créée
 */
const bookingARoom = async (bookingData) => {
    try {
        // Création de la réservation dans la base
        const booked = await Booking.create({
            userId: bookingData.userId,
            roomId: bookingData.roomId,
            date: bookingData.date,
            timeSlots: bookingData.timeSlots
        });
        return booked;
    } catch (error) {
        // TODO: remplacer console.log par un logger professionnel en prod
        console.log('Error on booking the room: ' + error.message);
        throw new Error(error.message);
    }
}

/**
 * Vérifie les créneaux horaires disponibles pour une salle à une date donnée.
 * @param {String} roomId - ID de la salle
 * @param {String} date - Date de réservation (format ISO)
 * @returns {Array|null} - Créneaux disponibles ou null si la salle n'existe pas
 */
const checkAvailableSlot = async (roomId, date) => {
    try {
        // Récupérer la salle
        const room = await Room.findById(roomId);
        if (!room) return null; // Salle introuvable : on retourne null

        // Récupérer les réservations existantes pour cette salle à cette date
        const bookings = await Booking.find({ roomId, date });

        // Si aucune réservation, tous les créneaux horaires sont disponibles
        if (bookings.length === 0) return room.openingHour;

        // Fusionner tous les timeSlots déjà réservés pour éviter les doublons
        const bookedSlots = bookings.flatMap(b => b.timeSlots);

        // Filtrer les créneaux encore disponibles en excluant ceux déjà réservés
        const availableSlots = room.openingHour.filter(hour => !bookedSlots.includes(hour));

        return availableSlots;
    } catch (error) {
        // TODO: remplacer console.log par un logger professionnel en prod
        console.log('Error on finding the availability of the room on the given date: ' + error.message);
        throw new Error(error.message);
    }
}

module.exports = { bookingARoom, checkAvailableSlot };