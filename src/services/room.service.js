const roomRepository = require('../repositories/room.repository');

const createRoom = async (name, volume, equipments) => {
    try {
        const roomData = { name, volume, equipments };
        const room = await roomRepository.createRoom(roomData);
        // Si création échoue, retourne null
        return room || null;
    } catch (error) {
        console.error('Error occurred when registering room:', error.message);
        throw new Error(error.message);
    }
}

const getAllRoom = async () => {
    try {
        const roomList = await roomRepository.getAllRoom();
        // Une liste vide ça peut arriver, donc on peut juste retourner l’array, pas besoin de null
        return roomList || [];
    } catch (error) {
        console.error('Error occurred when finding all rooms:', error.message);
        throw new Error(error.message);
    }
}

const updateRoom = async (id, name, volume, equipments) => {
    try {
        const roomUpdatedData = { id, name, volume, equipments };
        const updatedRoom = await roomRepository.updateRoom(roomUpdatedData);
        // Si la mise à jours échoue, retourne null
        return updatedRoom || null;
    } catch (error) {
        console.error('Error occurred when updating the rooms:', error.message);
        throw new Error(error.message);
    }
}

const deleteRoom = async (id) => {
    try {
        const deleted = await roomRepository.deleteRoom(id);
        // Si suppression foire, renvoie false, sinon true
        return !!deleted;
    } catch (error) {
        console.error('Error occurred when deleting room:', error.message);
        throw new Error(error.message);
    }
}

module.exports = { createRoom, getAllRoom, updateRoom, deleteRoom };
