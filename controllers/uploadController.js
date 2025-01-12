const multer = require('multer');
const sharp = require('sharp');  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

exports.uploadFile = [upload.single('image'), (req, res) => {
  if (req.file) {
    sharp(req.file.path)
      .resize(800, 800) 
      .toFile(`uploads/resized-${req.file.filename}`, (err, info) => {
        if (err) {
          return res.status(500).send('Error processing image');
        }
        res.json({ message: 'Image uploaded and processed', file: req.file });
      });
  } else {
    res.status(400).send('No file uploaded');
  }
}];
