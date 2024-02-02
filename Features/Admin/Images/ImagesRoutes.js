const { deleteImage } = require('./Services/DeleteImage');
const { uploadImage } = require('./Services/UploadImage');

const appRouter = require('express').Router();
const multer = require('multer');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
]
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1572864 },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('صيغة الملف غير مسموح بها'))
        }

        cb(null, true)
    }
})
appRouter.post('/', adminRolesValidator(['UploadImage']), upload.single('file'), uploadImage);
appRouter.delete('/:id', adminRolesValidator(['DeleteImage']), deleteImage);
module.exports = appRouter;