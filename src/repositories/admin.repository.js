const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

/**
 * Stats pour l'admin
 * @returns {Object|null} - Les stats en forme d'objet ou null
 */
const stats = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const users = await User.find({ role: 'user' });
        const rooms = await Room.find();
        const bookings = await Booking.find({ date: { $gt: today } });

        if(!users && !rooms && !bookings) return null;

        return {
            userAccount: users.length,
            roomAccount: rooms.length,
            bookingAccount: bookings.length
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

module.exports = { stats };