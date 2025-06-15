const bookingService = require('../services/booking.service');

/**
 * Contrôleur pour réserver une salle.
 * Récupère les infos utilisateur + salle + date + créneaux depuis la requête,
 * puis appelle le service pour créer la réservation.
 */
const bookingARoom = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.roomId;
        const { date, timeSlots } = req.body;

        const booked = await bookingService.bookingARoom(userId, id, date, timeSlots);

        if (!booked) {
            return res.status(400).json({ message: 'Cannot book the room.' });
        }

        res.status(200).json({
            message: 'Room booked',
            booked: booked
        });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Contrôleur pour consulter les créneaux disponibles d’une salle à une date donnée.
 * Récupère la salle et la date depuis les paramètres, puis appelle le service.
 */
const checkAvailableSlot = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { date } = req.query;

        const availableSlot = await bookingService.checkAvailableSlot(roomId, date);

        if (!availableSlot) {
            return res.status(400).json({ message: 'No available slot on that date.' });
        }

        res.status(200).json({ availableSlot });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Contrôleur pour récuperer les créservations d'un utilisateur.
 * Récupère les réservations depuis les paramètres, puis appelle le service.
 */
const getMyBooking = async (req, res) => {
    try {
        const { id } = req.user;
        const allBooking = await bookingService.getMyBooking(id);

        if(!allBooking) {
            return res.status(400).json({ message: 'No booking found for this user.' });
        }

        res.status(200).json({ allBooking });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}


module.exports = { bookingARoom, checkAvailableSlot, getMyBooking };
