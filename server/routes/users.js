const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads');

const userController = require('../controllers/userController');
const singleUpload = upload.single('image');

/* GET users listing. */
router.get('/users', userController.users_get);
router.get('/users/:id', userController.user_get);
router.post('/users/usernames', userController.users_username_check);
router.post('/avatar', function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: 'Image Upload Error', detail: err.message }],
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});
router.put('/users/:id', userController.user_put);
module.exports = router;
