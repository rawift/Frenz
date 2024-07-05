const mongoose = require('mongoose') 
const findOrCreate = require('mongoose-findorcreate');
const UserSchema = new mongoose.Schema({
    googleId : String,
    firstname: String,
    lastname: String,
    email : String,
    gender : String,
    bio:{
        type:String,
        default:"No Bio"
    },
    verified : {
        type : Boolean,
        default : false
    },
    batch : String,
    height : String,
    interests: {
        type: [String], // Define interests as an array of strings
        default: ["No Intersets"] // Default value is an empty array
      },
    image: String
});


UserSchema.plugin(findOrCreate);

const User = mongoose.model("User", UserSchema);

module.exports = User

