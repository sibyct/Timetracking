// src/controllers/auth.controller.js
const { findUserByEmail } = require('../services/user.service');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
};
