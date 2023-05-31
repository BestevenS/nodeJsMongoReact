const propertiesRoutes = require('./routes/properties');

app.use('/properties', propertiesRoutes);

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('your-mongodb-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
