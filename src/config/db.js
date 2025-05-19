const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Error on connecting to the database: ', error.message);
        process.exit(1);    // pour couper l'app proprement si la DB foire
    }
}

module.exports = { connectToDB };