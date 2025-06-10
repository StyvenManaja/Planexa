const bookingRepository = require('../repositories/booking.repository');

// Crée une réservation pour une salle donnée
const bookingARoom = async (userId, roomId, date, timeSlots) => {
    try {
        // Construction de l'objet réservation
        const bookingData = { userId, roomId, date, timeSlots };

        // Appel au repository pour créer la réservation
        return await bookingRepository.bookingARoom(bookingData);
    } catch (error) {
        console.error('Error on booking the room:', error.message);
        throw new Error(error.message);
    }
}

// Récupère les créneaux disponibles pour une salle à une date donnée
const checkAvailableSlot = async (roomId, date) => {
    try {
        return await bookingRepository.checkAvailableSlot(roomId, date);
    } catch (error) {
        console.error('Error on finding the availability of the room on the given date:', error.message);
        throw new Error(error.message);
    }
}

module.exports = { bookingARoom, checkAvailableSlot };
