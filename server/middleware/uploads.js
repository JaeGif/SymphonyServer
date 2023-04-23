const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk'),
  { S3 } = require('@aws-sdk/client-s3');
const config = require('../utilities/config');

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'us-east-1',
});

const s3 = new S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jaesymphonyreal',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()} + ${file.originalname}`);
    },
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
  }),
});

module.exports = upload;
