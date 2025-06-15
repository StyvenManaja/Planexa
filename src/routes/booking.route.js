const bookingController = require('../controllers/booking.controller');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

// Réserver une salle (auth requise)
router.post('/api/book/:roomId', authentication, bookingController.bookingARoom);

// Vérifier la disponibilité des créneaux pour une salle (auth requise)
router.get('/api/book/:roomId/availability', authentication, bookingController.checkAvailableSlot);

// Récuperer les réservation d'un utilisateur (auth requise)
router.get('/api/book/me', authentication, bookingController.getMyBooking);

module.exports = router;
