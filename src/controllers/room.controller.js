const roomService = require('../services/room.service');

const createRoom = async (req, res) => {
    try {
        const { name, volume, equipments } = req.body;
        const room = await roomService.createRoom(name, volume, equipments);
        if(!room) {
            res.status(401).json({ message: 'Can not create room.' });
        }
        res.status(200).json({ room });
    } catch (error) {
        const status = error.message.includes('already in use') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
}

const getAllRoom = async (req, res) => {
    try {
        const roomList = await roomService.getAllRoom();
        if(!roomList) {
            res.status(401).json({ message: 'No room found.' });
        }
        res.status(200).json({ roomList });
    } catch (error) {
        console.log('An error occured: ', error.message)
        res.status(500).json({ message: `Server error ${error.message}.` });
    }
}

const bookARoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { hours } = req.body;
        const bookedRoom = await roomService.bookARoom(id, hours);
        if(!bookedRoom) {
            res.status(401).json({ message: 'Can not book the room.' });
        }
        res.status(200).json({ bookedRoom });
    } catch (error) {
        console.log('An error occured: ', error)
        res.status(500).json({ message: `Server error ${error}.` });
    }
}

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await roomService.deleteRoom(id);
        if(!deleted) {
            res.status(401).json({ message: 'Can not delete room.' });
        }
        res.status(200).json({ message: 'Room deleted successfully.' });
    } catch (error) {
        console.log('An error occured: ', error.message)
        res.status(500).json({ message: `Server error ${error.message}.` });
    }
}

module.exports = { createRoom, getAllRoom, bookARoom, deleteRoom };