const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['for sale', 'for rent', 'sold', 'rented'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sqMeters: {
        type: Number,
        required: true
    },
    photos: [{
        type: String
    }],
    renovationStatus: {
        type: String
    },
    floor: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    kitchens: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    wc: {
        type: Number,
        required: true
    },
    livingRooms: {
        type: Number,
        required: true
    },
    constructionYear: {
        type: Number,
        required: true
    },
    distanceFromSea: {
        type: Number,
        required: true
    },
    propertyCode: {
        type: Number,
        unique: true
    },
    energyClass: String,
    heatingSystem: String,
    storage: {
        type: Boolean,
        required: true
    },
    attic: {
        type: Boolean,
        required: true
    },
    playroom: {
        type: Boolean,
        required: true
    },
    airConditioning: {
        type: Boolean,
        required: true
    },
    solarWaterHeater: {
        type: Boolean,
        required: true
    },
    underfloorHeating: {
        type: Boolean,
        required: true
    },
    elevator: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    petsAllowed: {
        type: Boolean,
        required: true
    },
    screens: {
        type: Boolean,
        required: true
    },
    fireplace: {
        type: Boolean,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true,
    },
    youtubeLink: String
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Property', PropertySchema);
