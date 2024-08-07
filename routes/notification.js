const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Notification = require('../models/notification');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/notificationuploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('form');
});

router.post('/add', upload.single('pdf'), async (req, res) => {
  try {
    const notification = new Notification({
      title: req.body.title,
      pdfPath: req.file.path
    });

    await notification.save();
    res.send('Notification saved successfully');
  } catch (error) {
    res.status(500).send('Error saving notification');
  }
});

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.render('notifications', { notifications });
  } catch (error) {
    res.status(500).send('Error fetching notifications');
  }
});

module.exports = router;
