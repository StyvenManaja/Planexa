const adminService = require('../services/admin.service');

// Récuperer les données pour le stats
const stats = async (req, res) => {
    try {
        const data = await adminService.stats();

        if(!stats) return res.status(400).json({ message: 'No data found.' });

        res.status(200).json({
            data: {
                users: data.userAccount,
                rooms: data.roomAccount,
                bookings: data.bookingAccount
            }
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

module.exports = { stats };