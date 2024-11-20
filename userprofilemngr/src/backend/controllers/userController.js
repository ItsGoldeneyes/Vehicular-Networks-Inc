import { query as _query } from '../../db/dbConfig';

const getUserProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        const query = `
            SELECT 
                u.name, 
                u.email, 
                u.phone,
                c.company_name, 
                c.position,
                l.points,
                p.card_number, 
                p.expiration_date,
                v.vehicle_name
            FROM users u
            JOIN companies c ON u.company_id = c.id
            JOIN loyalty_points l ON u.id = l.user_id
            LEFT JOIN payment_info p ON u.id = p.user_id
            LEFT JOIN vehicles v ON v.user_id = u.id
            WHERE u.id = $1;
        `;
        const values = [userId];

        const { rows } = await _query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = rows[0];
        res.json(userProfile);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { getUserProfile };
