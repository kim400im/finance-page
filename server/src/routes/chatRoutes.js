const express = require('express');
const { getAllChatMessages, createChatMessage } = require('../controllers/chatController');


const router = express.Router();

router.post('/chat', createChatMessage);

router.get('/chat', getAllChatMessages);

module.exports = router;

