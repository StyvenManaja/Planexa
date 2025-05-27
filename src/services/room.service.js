const roomRepository = require('../repositories/room.repository');

const createRoom = async (name, volume, equipments) => {
    try {
        const roomData = {
            name: name,
            volume: volume,
            equipments: equipments
        }
        const room = await roomRepository.createRoom(roomData);
        if(!room) { return null };
        return room;
    } catch (error) {
        console.log('An error occured when registering room: ', error.message);
        throw new Error('Error: ', error.message);
    }
}

const getAllRoom = async () => {
    try {
        const roomList = await roomRepository.getAllRoom();
        if(!roomList) { return null };
        return roomList;
    } catch (error) {
        console.log('An error occured when finding all room: ', error.message);
        throw new Error('Error: ', error.message);
    }
}

const bookARoom = async (id, hours) => {
    try {
        const roomBooked = await roomRepository.bookARoom(id, hours);
        if(!roomBooked) { return null };
        return roomBooked;
    } catch (error) {
        console.log('An error occured when booking the room: ', error);
        throw new Error('Error: ', error);
    }
}

const deleteRoom = async (id) => {
    try {
        const deleted = await roomRepository.deleteRoom(id);
        if(!deleted) { return false };
        return true;
    } catch (error) {
        console.log('An error occured when deleting room: ', error);
        throw new Error('Error: ', error);
    }
}

module.exports = { createRoom, getAllRoom, bookARoom, deleteRoom };