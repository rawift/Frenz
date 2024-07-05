const Message = require("../models/messageSchema");

exports.addMessage = async (req, res) => {
    try {
        const {chatId, senderId, text} = req.body
        const message = new Message({
          chatId,
          senderId,
          text
        })
        const result = await message.save()
        res.status(200).json(result)

    } catch (error) {
      return res.status(500).send(error);
    }
  };

  exports.getMessage = async (req, res) => {
    try {
        const {chatId} = req.params
        const result = await Message.find({chatId})
        res.status(200).json(result)
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  exports.recentMessage = async (req,res) => {
    try {
      // Find documents matching the senderId, sort them by the createdAt field in descending order (most recent first),
      // and limit the result to 1 document (the most recent one).
      let mostRecentData = await Message.find({chatId:req.params.chatId})
      res.status(200).json(mostRecentData[mostRecentData.length-1])
    } catch (error) {
      console.error('Error fetching most recent data:', error);
      throw error; // Handle or propagate the error as needed
    }
  }

