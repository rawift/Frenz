const mongoose = require("mongoose")
const findOrCreate = require('mongoose-findorcreate');

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: String,
    },
    senderId : {
        type: String
    },
    text: {
        type: String
    },
    timestampField: {
        type: Date,
        default: Date.now // This sets the default value to the current timestamp when a document is created
      }
})

MessageSchema.plugin(findOrCreate);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message
