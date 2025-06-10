const express = require('express');
const roomController = require('../controllers/room.controller');
const fieldValidator = require('../middlewares/room.validator');

const router = express.Router();

// Création d'une salle avec validation des champs
router.post('/api/room/create', fieldValidator.fieldValidator, roomController.createRoom);

// Récupérer la liste de toutes les salles
router.get('/api/rooms', roomController.getAllRoom);

// Suppression d'une salle par son ID
router.delete('/api/room/:id', roomController.deleteRoom);

module.exports = router;
