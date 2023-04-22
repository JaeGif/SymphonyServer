const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

/* GET users listing. */
router.get('/rooms', roomController.rooms_get);
router.get('/rooms/:id', roomController.room_get);
router.post('/rooms', roomController.room_post);
router.put('/rooms/:id', roomController.room_put);

module.exports = router;
