const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = require('express').Router();
const MaterialController = require('../controllers/MaterialController');
const generateFilename = require('../utils/generateFilename');

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folderPath = path.resolve(
                __dirname,
                '../',
                '../',
                'public',
                'uploads',
                'material',
            );
            fs.mkdirSync(folderPath, { recursive: true });
            cb(null, folderPath);
        },
        filename: function (req, file, cb) {
            const filename = generateFilename();
            cb(null, filename + path.extname(file.originalname));
        },
    }),
});

router.delete('/delete/:materialId', MaterialController.delete);
router.patch('/update/:materialId', uploadFile.single('image'), MaterialController.update);
router.post('/create', uploadFile.single('image'), MaterialController.create);
router.route('/').get(MaterialController.getAll);

module.exports = router;
