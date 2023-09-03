const Property = require('../models/Property');

exports.createProperty = async (propertyData) => {
    try {
        const property = new Property(propertyData);
        return await property.save();
    } catch (error) {
        throw error;
    }
}

exports.getProperties = async (queryObj = {}) => { 
    // Χρησιμοποιούμε default value για το queryObj ώστε αν δεν παρέχεται, να επιστρέφονται όλα τα ακίνητα
    try {
        return await Property.find(queryObj);
    } catch (error) {
        throw error;
    }
}


exports.getPropertyById = async (id) => {
    try {
        return await Property.findById(id);
    } catch (error) {
        throw error;
    }
}

exports.updateProperty = async (id, updateData) => {
    try {
        return await Property.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw error;
    }
}

exports.deleteProperty = async (id) => {
    try {
        return await Property.findByIdAndRemove(id);
    } catch (error) {
        throw error;
    }
}
