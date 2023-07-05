const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Διάβασμα της κεφαλίδας Authorization
  const authHeader = req.header('Authorization');

  // Έλεγχος αν η κεφαλίδα Authorization υπάρχει
  if (!authHeader) {
    return res.status(401).json({ message: 'Απαιτείται πιστοποίηση' });
  }

  // Εξαγωγή του token από την κεφαλίδα Authorization
  const token = authHeader.split(' ')[1]; 

  try {
    // Επαλήθευση του token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Προσθήκη του user στο request
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token μη έγκυρο' });
  }
};
