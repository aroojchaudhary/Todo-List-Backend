const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid user credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 360000 }, (err, token) => {
            if (err){
                throw err;
            } 
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;