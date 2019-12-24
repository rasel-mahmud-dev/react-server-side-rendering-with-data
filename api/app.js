const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const expressSession = require('express-session')
const corse = require('cors')

const keys = require('./config/keys')

// model........
require('./models/User')

// passport initial............
require('./passport/passportLocal')

// import roures........
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')


const app = express()
app.use(corse())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieSession({
  name:"hjjjjj",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  keys: [ keys.sessionSecret ]
}))
// ! or
// app.use(expressSession({
//   resave: true,
//   saveUninitialized: true,
//   secret: "Secret"
// }))


// passport session and initialize
app.use(passport.initialize())

// Set logged user obj inside req obj 
app.use(passport.session())


// // check our auth status........
// app.use((req, res, next)=>{
//   // console.log("req user", req.user);
//   // console.log("req session", req.session);
//   next()
// })


// routes registed......
app.use(authRoutes)
app.use(userRoutes)



mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log('databased conneted...');
    app.listen(4001, ()=>console.log(`Server is Running on port http://localhost:4001`))
  }).catch(err=> console.log(err))
