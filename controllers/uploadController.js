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
}).single('image'); 

exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: 'error',
          code: 'LIMIT_FILE_SIZE',
          message: 'File size exceeds the 5MB limit',
        });
      }
      if (err.message === 'Only image files are allowed') {
        return res.status(400).json({
          status: 'error',
          code: 'INVALID_FILE_TYPE',
          message: 'Only image files are allowed',
        });
      }
      return res.status(500).json({
        status: 'error',
        code: 'UPLOAD_ERROR',
        message: 'Error uploading file',
      });
    }

    if (req.file) {
      sharp(req.file.path)
        .resize(800, 800)  
        .toFile(`uploads/resized-${req.file.filename}`, (err, info) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              code: 'IMAGE_PROCESSING_ERROR',
              message: 'Error processing image',
            });
          }
          return res.status(200).json({
            status: 'success',
            code: 'IMAGE_UPLOADED',
            message: 'Image uploaded and processed',
            file: req.file,
          });
        });
    } else {
      return res.status(400).json({
        status: 'error',
        code: 'NO_FILE_UPLOADED',
        message: 'No file uploaded',
      });
    }
  });
};
