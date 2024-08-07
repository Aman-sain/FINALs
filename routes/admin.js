const express = require('express');
const multer = require('multer');
const Pdf = require('../models/pdf');
const router = express.Router();
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/downloaduploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Admin page to upload and delete PDFs
router.get('/', async (req, res) => {
    try {
        const pdfs = await Pdf.find();
        res.render('admin', { pdfs: pdfs });
    } catch (err) {
        console.error('Error fetching PDFs:', err);
        res.status(500).send('Error fetching PDFs');
    }
});

router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const pdf = new Pdf({
            filename: req.file.filename,
            path: req.file.path,
            contentType: req.file.mimetype
        });
        await pdf.save();
        res.redirect('/documentation');
    } catch (err) {
        console.error('Error uploading PDF:', err);
        res.status(500).send('Error uploading PDF');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id);
        if (!pdf) {
            return res.status(404).send('PDF not found');
        }
        await pdf.deleteOne();
        res.redirect('/documentation');
    } catch (err) {
        console.error('Error deleting PDF:', err);
        res.status(500).send('Error deleting PDF');
    }
});

module.exports = router;
