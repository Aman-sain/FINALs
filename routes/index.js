const express = require('express');
const Pdf = require('../models/pdf');
const router = express.Router();

// User page to download the latest PDF
router.get('/', async (req, res) => {
    const pdf = await Pdf.findOne().sort({ _id: -1 });
    res.render('Downloadupload', { pdf: pdf });
});

router.get('/download-file', async (req, res) => {
    const pdf = await Pdf.findOne().sort({ _id: -1 });
    if (pdf) {
        res.download(pdf.path, pdf.filename);
    } else {
        res.send('No PDF available for download.');
    }
});

module.exports = router;
