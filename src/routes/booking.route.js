const bookingController = require('../controllers/booking.controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

// Réserver une salle (auth requise)
router.post('/api/book/:roomId', authentication, bookingController.bookingARoom);

// Vérifier la disponibilité des créneaux pour une salle (auth requise)
router.get('/api/book/:roomId/availability', authentication, bookingController.checkAvailableSlot);

// Récuperer les réservation d'un utilisateur (auth requise)
router.get('/api/book/me', authentication, bookingController.getMyBooking);

// Récuperer les résevations confirmé (auth et role vérif requise)
router.get('/api/book/confirmed', authentication, authorization.verifyRole, bookingController.getConfirmedBooking);

// Annuler un réservation (auth requise)
router.put('/api/book/:id', authentication, bookingController.cancelBooking);

module.exports = router;
