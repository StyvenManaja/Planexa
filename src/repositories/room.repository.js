const Room = require('../models/Room');

const createRoom = async (roomData) => {
    try {
        const room = await Room.create({
            name: roomData.name,
            volume: roomData.volume,
            equipments: roomData.equipments,
        })
        return room;
    } catch (error) {
        if(error.code === 11000) {
            throw new Error('Name already in use.');
        }
        throw error;
    }
}

const getAllRoom = async () => {
    try {
        const roomList = await Room.find();
        return roomList;
    } catch (error) {
        throw new Error('Error on finding all room: ' + error.message);
    }
}

const bookARoom = async (id, hours) => {
    try {
        const room = await Room.findById(id);
        hours.forEach(hour => {
            if(room.availability.hasOwnProperty(hour)) {
                room.availability[hour] = false;
            }
        });
        await room.save();
        return room;
    } catch (error) {
        throw new Error('Error on booking the room: ' + error.message);
    }
}

const deleteRoom = async (id) => {
    try {
        await Room.findByIdAndDelete(id);
        return true;
    } catch (error) {
        throw new Error('Error on deleting room: ' + error.message);
    }
}

module.exports = { createRoom, getAllRoom, bookARoom, deleteRoom };