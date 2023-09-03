const propertyService = require('../services/propertyService');
const fs = require('fs');
const path = require('path');

exports.uploadPhoto = async (req, res, next) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }

    try {
        const property = await propertyService.getPropertyById(id);
        if (!property) {
            return res.status(404).send({ error: 'Property not found.' });
        }

        property.photos.push(file.filename);
        await propertyService.updateProperty(id, property);

        res.status(200).json({ filename: file.filename });
    } catch (error) {
        next(error);
    }
};

exports.deletePhoto = async (req, res, next) => {
    const { id, filename } = req.params;

    try {
        const property = await propertyService.getPropertyById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        const photoIndex = property.photos.indexOf(filename);
        if (photoIndex === -1) {
            return res.status(404).json({ message: "Photo not found" });
        }

        property.photos.splice(photoIndex, 1);
        await propertyService.updateProperty(id, property);

        const filePath = path.join(__dirname, "..", "uploads", filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to delete photo" });
            }
        });

        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.createProperty = async (req, res, next) => {
    try {
        const propertyData = req.body;

        if (req.file) {
            propertyData.photos = [req.file.filename];
        }
        
        // Επαληθεύστε τα νέα πεδία εδώ αν χρειάζεται

        const property = await propertyService.createProperty(propertyData);
        res.status(201).json(property);
    } catch (error) {
        next(error);
    }
};

exports.getAllProperties = async (req, res, next) => {
    try {
        let queryObj = {};

        if (req.query.status) {
            queryObj.status = req.query.status;
        }
        if (req.query.location) {
            queryObj.location = req.query.location;
        }
        if (req.query.type) {
            queryObj.type = req.query.type;
        }
        if (req.query.priceFrom && req.query.priceTo) {
            queryObj.price = {
                $gte: Number(req.query.priceFrom),
                $lte: Number(req.query.priceTo)
            };
        }
        // Συνεχίστε με άλλα query parameters εάν χρειάζεται

        const properties = await propertyService.getProperties(queryObj);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};

exports.getPropertyById = async (req, res, next) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};

exports.updateProperty = async (req, res, next) => {
    try {
        const property = await propertyService.updateProperty(req.params.id, req.body);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};

exports.deleteProperty = async (req, res, next) => {
    const { id } = req.params;
    try {
        const property = await propertyService.getPropertyById(id);
        if (!property) {
            return res.status(404).send({ error: 'Property not found.' });
        }

        property.photos.forEach((filename) => {
            fs.unlinkSync(path.join(__dirname, '../uploads', filename));
        });

        await propertyService.deleteProperty(id);

        res.status(200).json({ message: 'Property deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
