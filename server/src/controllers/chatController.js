const ChatMessage = require('../models/chatMessage')

// 새로운 채팅 메시지 생성
async function createChatMessage(req, res){
    try {
        const newMessage = new ChatMessage(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({message: 'Error creating message', error: err});
    }
}

// 모든 채팅 메시지 가져오기
async function getAllChatMessages(req, res) {
    try {
        const message = await ChatMessage.find();
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({message: 'Error fetching messages', error: err});
    }
}

module.exports = { createChatMessage, getAllChatMessages}