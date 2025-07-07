const express = require('express');

const authenticate = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const roomController = require('../controllers/room.controller');
const fieldValidator = require('../middlewares/room.validator');

const router = express.Router();

// Création d'une salle avec validation des champs (auth requise)
router.post('/api/room/create', authenticate, authorization.verifyRole, fieldValidator.fieldValidator, roomController.createRoom);

// Récupérer la liste de toutes les salles (auth requise)
router.get('/api/room', authenticate, roomController.getAllRoom);

// Mettre à jours une salle (auth requise)
router.put('/api/room/update/:id', authenticate, authorization.verifyRole, fieldValidator.fieldValidator, roomController.updateRoom);

// Suppression d'une salle par son ID (auth requise)
router.delete('/api/room/delete/:id', authenticate, authorization.verifyRole, roomController.deleteRoom);

module.exports = router;
