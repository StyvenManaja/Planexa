const verifyRole = (req, res, next) => {
    try {
        // Récuperation du role depuis la requête
        const { role } = req.user;
        if(role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
        }
        next();
    } catch (error) {
        // Lancer l’erreur au prochain middleware d’erreur global
        throw new Error(`An error occurred: ${error.message}`);
    }
}

module.exports = { verifyRole };