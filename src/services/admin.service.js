const adminRepository = require('../repositories/admin.repository');

// Récuperer quelques données pour le stats
const stats = async () => {
    try {
        // Appel au repository pour les données
        return await adminRepository.stats();
    } catch (error) {
        console.error('Error on finding all data:', error.message);
        throw new Error(error.message); 
    }
}

module.exports = { stats };