const Property = require('../models/property');

exports.getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
};
