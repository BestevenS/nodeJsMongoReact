require('dotenv').config();

// Εισαγωγή των απαραίτητων βιβλιοθηκών
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Εισαγωγή των routes
const usersRouter = require('./routes/usersRoutes.js');
const propertyRouter = require('./routes/propertyRoutes.js'); // Προσθήκη του propertyRoutes

// Σύνδεση με την MongoDB
mongoose.connect('mongodb://localhost/real_estate_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Έλεγχος επιτυχίας ή αποτυχίας της σύνδεσης
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Δημιουργία του Express application
const app = express();

// Χρήση του CORS για να επιτρέψουμε Cross-Origin requests
app.use(cors());

// Ορισμός του middleware για την ανάλυση των JSON bodies από τα requests
app.use(express.json());

// Χρήση των routes
app.use('/users', usersRouter);
app.use('/properties', propertyRouter); // Χρήση του propertyRoutes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Θέτουμε την θύρα που θα ακούει ο server
const port = process.env.PORT || 5000;

// Εκκίνηση του server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
