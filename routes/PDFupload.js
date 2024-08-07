const express = require('express');
const multer = require('multer');
const path = require('path');
const FormData = require('../models/formData');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('PDFupload');
});

router.post('/submit-form', upload.single('pdf'), async (req, res) => {
    const { name, email } = req.body;
    const pdfPath = req.file ? req.file.path : null;

    if (pdfPath) {
        try {
            const formData = new FormData({ name, email, pdfPath });
            await formData.save();
            res.render('success', { formData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error saving form data');
        }
    } else {
        res.status(400).send('File upload failed');
    }
});

// Route to get and display all form data
router.get('/data', async (req, res) => {
    try {
        const data = await FormData.find({});
        console.log(data)
        res.render('data', { data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving form data');
    }
});

module.exports = router;
