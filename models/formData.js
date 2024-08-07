const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pdfPath: { type: String, required: true }
});

module.exports = mongoose.model('FormData', formDataSchema);
