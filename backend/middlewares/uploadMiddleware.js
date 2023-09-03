const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Επιτρέπονται μόνο οι τύποι αρχείων jpeg και png
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Όριο αρχείου 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;
