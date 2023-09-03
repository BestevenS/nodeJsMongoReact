const adminService = require('../services/adminService');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

exports.delete = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'uploads', req.params.id);
        
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(400).json({ error: 'Error deleting file.' });
            } else {
                res.status(200).json({ message: 'File deleted successfully.' });
            }
        });
    } catch (error) {
        res.status(400).send({ error: 'Error deleting file.' });
    }
};
// Ρύθμιση του multer
const upload = multer({
    dest: 'uploads/', // Αυτό είναι το φάκελο στον οποίο θα αποθηκεύονται τα αρχεία
    limits: {
        fileSize: 1000000, // Το μέγιστο μέγεθος αρχείου είναι 1MB
    },
});

// Η μέθοδος upload στον adminController
exports.upload = (req, res) => {
    try {
        // Εδώ μπορείς να προσθέσεις περισσότερο κώδικα για την επεξεργασία του αρχείου που μεταφορτώνεται

        res.status(200).send({message: "File uploaded successfully", file: req.file});
    } catch (error) {
        res.status(400).send({ error: 'Error uploading file.' });
    }
};

exports.register = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json({ admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const admin = await adminService.findAdmin(req.body.username);
        if (!admin) {
            return res.status(401).json({ error: "Username is wrong" });
        }

        const isPasswordMatch = await new Promise((resolve, reject) => {
            admin.comparePassword(req.body.password, (err, match) => {
                if (err) reject(err);
                resolve(match);
            });
        });

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Password is wrong" });
        }

        const token = await adminService.generateAuthToken(admin);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const admin = await adminService.findAdmin(req.user.username);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        admin.password = undefined;
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
