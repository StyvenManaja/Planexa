const mongoose = require('mongoose');

/**
 * Établit la connexion à la base de données MongoDB en utilisant l'URI dans les variables d'environnement.
 * En cas d'échec, affiche l'erreur et arrête proprement l'application.
 */
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database.');
    } catch (error) {
        // Affiche l'erreur et termine le processus car sans DB l'app ne peut pas tourner
        console.error('Error on connecting to the database: ', error.message);
        process.exit(1);
    }
}

module.exports = { connectToDB };
