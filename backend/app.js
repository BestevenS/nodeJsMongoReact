const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Προσθήκη αυτής της γραμμής

const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Ρύθμιση του express να δέχεται JSON
app.use(express.json());

// Χρήση του CORS middleware
app.use(cors());

// Σύνδεση με τη βάση δεδομένων MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB successfully!'))
.catch(err => console.error('Could not connect to MongoDB...'));

// Ρύθμιση CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ορισμός των routes
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Route για τις εικόνες
app.get('/uploads/:filename', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'uploads', req.params.filename));
});

// Ορισμός του port και εκκίνηση του server
const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
