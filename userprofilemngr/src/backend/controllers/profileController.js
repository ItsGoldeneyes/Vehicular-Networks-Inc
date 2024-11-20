const db = require('../../db/db'); //db connection

// Fetch user profile details
exports.getUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    res.json(result.rows[0]);
};

// Fetch owned vehicles
exports.getOwnedVehicles = async (req, res) => {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM vehicles WHERE user_id = $1', [userId]);
    res.json(result.rows);
};

// Fetch purchases
exports.getPurchases = async (req, res) => {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM purchases WHERE user_id = $1', [userId]);
    res.json(result.rows);
};

// Fetch payment credentials
exports.getPaymentCreds = async (req, res) => {
    const userId = req.params.userId;
    const result = await db.query('SELECT * FROM payment_credentials WHERE user_id = $1', [userId]);
    res.json(result.rows[0]);
};
