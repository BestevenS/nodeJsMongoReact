const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        constole.log(process.env.JWT_SECRET);

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        const admin = await Admin.findOne({ _id: data._id, 'tokens.token': token });

        if (!user) {
            console.log('No user found with this token');
        }
            if (!admin) {
            console.log('No admin found with this token');
        }
        
        if (!user && !admin) {
            console.log('User/Admin not found with this token');
            throw new Error();
        }

        req.user = user ? user : admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

const authAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findOne({ _id: data._id, 'tokens.token': token });

        if (!admin) {
            throw new Error('Admin not found with this token');
        }

        req.user = admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

module.exports = { auth, authAdmin };
