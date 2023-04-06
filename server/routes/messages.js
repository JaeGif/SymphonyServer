const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/* GET users listing. */
router.get('/messages', messageController.get_messages);
router.get('/messages/:id', messageController.get_message);

module.exports = router;
