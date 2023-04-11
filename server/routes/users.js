const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/users', userController.users_get);
router.get('/users/:id', userController.user_get);
router.put('/users/:id', userController.user_put);
module.exports = router;
