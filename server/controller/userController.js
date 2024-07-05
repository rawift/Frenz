const User = require("../models/userSchema");

exports.profile = async (req, res) => {
    try {
        if(req.isAuthenticated()){
            console.log(req.user)
            const user = await User.findById(req.user._id)
            res.json(user)
        } else {
            res.json("user not logged in");
        }

    } catch (error) {
      return res.status(500).send(error);
    }
  };

exports.user = async(req, res) => {
    try{
        if(req.isAuthenticated()){
            console.log(req.params.userId)
            const user = await User.findById(req.params.userId)
            res.json(user)
        } else {
            res.json("user not logged in");
        }
    }catch (error) {
      return res.status(500).send(error);
    }
}