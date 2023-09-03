const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cryptoService = require('./cryptoService');
require('dotenv').config();

const createUser = async (userData) => {
    const {username, password, email} = userData;

    // Check if username or email already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
        throw new Error('Username or email already exists');
    }

    // Create the user
    user = new User({username, password, email});

    return await user.save();
};

const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

const findUser = async (username) => {
    const user = await User.findOne({ username: username });
    return user;
};

module.exports = {
    createUser,
    findUserById,
    generateAuthToken,
    findUser
};
