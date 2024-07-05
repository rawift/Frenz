require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const User = require("./models/userSchema")
const meetRouter = require("./zoom/zoom")
const port = 8000
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes")
const messageRouter = require("./routes/messageRoutes")
const cors = require('cors');
const { user } = require('./controller/userController');

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 24 * 60 * 60 * 100000
    },
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.set("strictQuery", false);



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback'
},
      async function (accessToken, refreshToken, profile, cb) {
         /*User.findOrCreate({ googleId: profile.id , email : profile.emails[0].value, image: profile.photos[0].value, firstname: profile.name.givenName, lastname:profile.name.familyName}, function (err, user) {
          console.log(err)
          console.log(user)
            return cb(err, user);
          });*/


          try {
            
          const existingUser = await User.findOne({ email : profile.emails[0].value });
          let user

          if (existingUser) {
              // Update existing user
              const result = await User.updateOne({ email: profile.emails[0].value }, { $set: { googleId: profile.id , email : profile.emails[0].value, image: profile.photos[0].value, firstname: profile.name.givenName, lastname:profile.name.familyName} });
              user = await User.findOne({ email: profile.emails[0].value})
          } else {
              // Create new user
              const newUser = new User({
                googleId: profile.id , email : profile.emails[0].value, image: profile.photos[0].value, firstname: profile.name.givenName, lastname:profile.name.familyName
            })
    
            user = await newUser.save()
          }
          return cb(null, user);
      } catch (err) {
          console.error('Error:', err);
      } 
        }
  
));




app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], prompt: 'select_account' }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000/main');
  });

 
  app.use("/user", userRouter);
  app.use("/meet",meetRouter)
  app.use("/chat",chatRouter)
  app.use("/message",messageRouter)



  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    try {
      console.log("DataBase connected successfully")
      app.listen(port, () => {
          console.log(`Server connected to http://localhost:${port}`)
      })
  } catch (error) {
      console.log('Cannot start the server')
  }
  }).catch(error => {
    console.log('invalid database connection')
})


