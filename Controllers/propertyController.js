const Property = require('../models/Property');

// Create
exports.createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const property = await newProperty.save();

    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
};

// Read (Get all properties)
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
};

// Read (Get single property)
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'No property found'
      });
    }
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
};

// Update
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'No property found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
};

// Delete
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'No property found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
};
