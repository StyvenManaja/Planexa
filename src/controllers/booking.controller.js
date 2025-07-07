const bookingService = require('../services/booking.service');
const normalizeDate = require('../utils/normalizeDate');;

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

        // Transformer la date avec l'heure par defalut avant l'enregistrement
        const dateNormalized = normalizeDate(date);

        const booked = await bookingService.bookingARoom(userId, id, dateNormalized, timeSlots);

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

        // Vérifier la date avec l'heure par default
        const dateNormalized = normalizeDate(date);

        const availableSlot = await bookingService.checkAvailableSlot(roomId, dateNormalized);

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

// Récuperer les réservations confirmé qui sont à vénir
const getConfirmedBooking = async (req, res) => {
    try {
        const confirmedBooking = await bookingService.getConfirmedBooking();
        if(!confirmedBooking) return res.status(400).json({ message: 'No confirmed booking found.' });

        res.status(200).json({ confirmedBooking });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

// Annuler un résa avec son ID à condition que la date du résa n'est pas encore passé ou aujourd'hui
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const canceledBooking = await bookingService.cancelBooking(id, userId);
        if(!canceledBooking) return res.status(400).json({ message: 'Cannot cancel the booking.' });
        res.status(200).json({ canceledBooking });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

module.exports = { bookingARoom, checkAvailableSlot, getMyBooking, getConfirmedBooking, cancelBooking };
