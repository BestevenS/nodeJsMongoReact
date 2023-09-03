const userService = require('../services/userService');

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.findUserById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.findUser(req.body.username);
        if (!user) {
            return res.status(401).json({ error: "Username is wrong" });
        }

        // Convert callback-based function to Promise
        const isPasswordMatch = await new Promise((resolve, reject) => {
            user.comparePassword(req.body.password, (err, match) => {
                if (err) reject(err);
                resolve(match);
            });
        });

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Password is wrong" });
        }
            
        const token = await userService.generateAuthToken(user);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.findUserById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = undefined;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};