const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware, uploadFile);

module.exports = router;
