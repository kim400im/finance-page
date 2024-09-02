const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    message: {type: String, required: true},
    sendAt: {type: Date, default: Date.now},
}, {timestamps:true});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;