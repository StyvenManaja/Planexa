const Booking = require('../models/Booking');
const Room = require('../models/Room');

/**
 * Crée une réservation pour un utilisateur dans une salle à une date et créneaux donnés.
 * @param {Object} bookingData - { userId, roomId, date, timeSlots }
 * @returns {Object|Null} - La réservation créée ou null
 */
const bookingARoom = async (bookingData) => {
    try {
        /*
        Vérifier tout d'abord si la salle a déjà un résa à la date donné
        Si oui, comparer les horaires du résa qui est déjà fait et les horaires du nouveau résa
            S'il y a un ou plusieurs créneaux déjà pris dans le premier résa, renvoi null et interrompre le programme
            (et de toute façon ça n'arrivera jamais car depuis le frontend, on appelera toujours le controlleur pour vérifier la disponibilité de la salle à la date donner mais c'est juste par sécurité que je doit faire ça)
        Si non, bah on continuer avec le code en bas     
        */
        const conflict = await Booking.findOne({
            roomId: bookingData.roomId,
            date: bookingData.date,
            timeSlots: { $in: bookingData.timeSlots }
        })

        if(conflict) return null;

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

/**
 * Récuperer toute les réservations d'un utilisateur authentifié
 * @param {String} userId - ID de l'utilisateur
 * @returns {Array|null} - Les réservations de l'utilisateur
 */
const getMyBooking = async (userId) => {
    try {
        //récuperer les réservations depuis la base via l'userId
        const allBooking = await Booking.find({ userId: userId });
        if(!allBooking || allBooking.length === 0) return null;    // si pas de résa trouver, on renvoi rien
        return allBooking;
    } catch (error) {
        console.log('Error on finding all booking for the user: ' + error.message);
        throw new Error(error.message);
    }
}

/**
 * Récuperer les réservations disponible (Spécial Admin)
 * @returns {Array|null} - La liste des réservation dispo qui sont en status confirmé et qui son encore à vénir
 */
const getConfirmedBooking = async () => {
    try {
        const today = new Date();
        const bookingArray = await Booking.find({
            date: { $gt: today },
            status: "confirmed"
        })
        if(!bookingArray || bookingArray.length === 0) return null;
        return bookingArray;
    } catch (error) {
        console.log('Error on finding all confirmed booking: ' + error.message);
        throw new Error(error.message);
    }
}

/**
 * Annuler un résa éffectué à condition que ce n'est pas encore aujourd'hui
 * @param {bookingId} - On annule le résa avec son ID
 * @returns {Object|null} - Retourne le résa annuler
 */

const cancelBooking = async (bookingId, userId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const canceledBooking = await Booking.findOneAndUpdate({
            _id: bookingId,
            userId: userId,
            date: { $gt: today }
        },
        {
            status: 'canceled'
        },
        { new: true }
    )

        if(!canceledBooking) return null;
        return canceledBooking;
    } catch (error) {
        console.log('Error on canceling the booking: ' + error.message);
        throw new Error(error.message);
    }
}

module.exports = { bookingARoom, checkAvailableSlot, getMyBooking, getConfirmedBooking, cancelBooking };