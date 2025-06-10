const roomService = require('../services/room.service');

/**
 * Crée une nouvelle salle avec les informations fournies dans le body.
 * Retourne la salle créée ou un message d'erreur si la création échoue.
 */
const createRoom = async (req, res) => {
    try {
        const { name, volume, equipments } = req.body;
        const room = await roomService.createRoom(name, volume, equipments);

        if (!room) {
            return res.status(400).json({ message: 'Cannot create room.' });
        }

        res.status(200).json({ room });
    } catch (error) {
        // Erreur personnalisée si nom de salle déjà utilisé
        const status = error.message.includes('already in use') ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

/**
 * Récupère la liste de toutes les salles enregistrées.
 * Retourne un tableau vide ou un message d'erreur si aucun résultat.
 */
const getAllRoom = async (req, res) => {
    try {
        const roomList = await roomService.getAllRoom();

        if (!roomList || roomList.length === 0) {
            return res.status(404).json({ message: 'No room found.' });
        }

        res.status(200).json({ roomList });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

/**
 * Supprime une salle via son ID (fourni dans les params).
 * Retourne un message de succès ou une erreur si l’ID est invalide ou introuvable.
 */
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await roomService.deleteRoom(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Room not found or cannot be deleted.' });
        }

        res.status(200).json({ message: 'Room deleted successfully.' });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = { createRoom, getAllRoom, deleteRoom };
