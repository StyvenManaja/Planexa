const express = require('express');
const roomController = require('../controllers/room.controller');
const fieldValidator = require('../middlewares/room.validator');

const router = express.Router();

router.post('/api/room/create', fieldValidator.fieldValidator, roomController.createRoom);
router.get('/api/rooms', roomController.getAllRoom);
router.put('/api/room/:id', roomController.bookARoom);
router.delete('/api/room/:id', roomController.deleteRoom);

module.exports = router;