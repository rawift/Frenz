const mongoose = require("mongoose")
const findOrCreate = require('mongoose-findorcreate');
const ChatSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
    timestampField: {
        type: Date,
        default: Date.now // This sets the default value to the current timestamp when a document is created
      }
})

ChatSchema.plugin(findOrCreate);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat
