const Admin = require('../models/Admin');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const createAdmin = async (adminData) => {
    const {username, password, email} = adminData;
    let admin = await Admin.findOne({ $or: [{ username }, { email }] });

    if (admin) {
        throw new Error('Username or email already exists');
    }

    admin = new Admin({username, password, email});
    return await admin.save();
};

const findAdmin = async (username) => {
    return await Admin.findOne({ username });
};

const generateAuthToken = async (admin) => {
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    admin.tokens = admin.tokens.concat({ token });
    await admin.save();
    return token;
};

module.exports = {
    createAdmin,
    findAdmin,
    generateAuthToken
};
