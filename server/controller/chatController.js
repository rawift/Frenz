const Chat = require("../models/chatSchema");

exports.createChat = async (req, res) => {
    try {

        const newChat = new Chat({
            members:[req.body.senderId, req.body.receiverId]
        })

        const result = await newChat.save()
        res.status(200).json(result)

    } catch (error) {
      return res.status(500).send(error);
    }
  };

  exports.userChats = async (req, res) => {
    try {
      console.log(req.params.userId)
        const chat = await Chat.find({
            members:{$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  exports.findChats = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
      return res.status(500).send(error);
    }
  };
