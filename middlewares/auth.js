const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Διάβασμα του token από την κεφαλίδα
  const token = req.header('Authorization');

  // Έλεγχος αν το token υπάρχει
  if (!token) {
    return res.status(401).json({ message: 'Απαιτείται πιστοποίηση' });
  }

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
