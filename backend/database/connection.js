const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;