const Room = require('../models/Room');

/**
 * Crée une nouvelle salle en base
 * @param {Object} roomData - données de la salle { name, volume, equipments }
 * @throws {Error} si le nom est déjà utilisé ou autre erreur base
 * @returns {Promise<Object>} la salle créée
 */
const createRoom = async (roomData) => {
    try {
        const room = await Room.create(roomData);
        return room;
    } catch (error) {
        // Gestion spécifique de l'erreur de doublon MongoDB (code 11000)
        if (error.code === 11000) {
            throw new Error('Name already in use.');
        }
        // Rethrow pour ne pas masquer l’erreur d’origine
        throw error;
    }
};

/**
 * Récupère toutes les salles en base
 * @returns {Promise<Array>} liste des salles
 * @throws {Error} en cas de problème de lecture
 */
const getAllRoom = async () => {
    try {
        return await Room.find();
    } catch (error) {
        throw new Error(`Error on finding all rooms: ${error.message}`);
    }
};

/**
 * Mettre à jours les données d'une salle par son ID
 * @param {Object} roomUpdatedData - Les nouvelles valeurs de la salle
 * @throws {Error} si erreur lors de la mise à jours
 * @returns {Promise<Object>} la salle mis à jours
 */
const updateRoom = async (roomUpdatedData) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomUpdatedData.id, {
            name: roomUpdatedData.name,
            volume: roomUpdatedData.volume,
            equipments: roomUpdatedData.equipments
        })
        return updatedRoom;
    } catch (error) {
        throw new Error(`Error on updating the room: ${error.message}`);
    }
}

/**
 * Supprime une salle par son ID
 * @param {String} id - ID MongoDB de la salle
 * @returns {Promise<Boolean>} true si suppression OK
 * @throws {Error} en cas d’erreur
 */
const deleteRoom = async (id) => {
    try {
        const deleted = await Room.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('Room not found.');
        }
        return true;
    } catch (error) {
        throw new Error(`Error on deleting room: ${error.message}`);
    }
};

module.exports = { createRoom, getAllRoom, updateRoom, deleteRoom };
