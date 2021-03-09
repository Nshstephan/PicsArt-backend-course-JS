const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');


const authentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'});
    }
};

module.exports = authentication;