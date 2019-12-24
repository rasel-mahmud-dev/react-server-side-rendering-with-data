const express = require('express')
const router = express.Router()
const passport = require('passport')
const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')


const User = require('mongoose').model("User")

router.post('/auth/login', async (req, res, next)=>{
  const schema = Joi.object({
    email: Joi
    .string()
    .email({minDomainSegments:2, tlds:{allow:['com', 'net']}})
    .required(),
    password: Joi.string().min(3).required()
  })


  try{
    // initial user given input validate........
    const { error } = schema.validate(req.body, { abortEarly: false })
    if(error) {
      const customError = new Error();
      customError.statusCode = 401
      customError.error = error
      throw customError;      
    }

    // Manually Database query && ==> after validate.......
    let user = await User.findOne({email: req.body.email})
    if(!user){
      const customError = new Error()
      customError.statusCode = 401
      const newError = { details: [ { message: "This Email is not yet Registered", path:['email']}] }
      customError.error = newError;
      throw customError;
    }


    // if u put it bottom u need call it with (req, res, next) and we got more control
    // Passport hit............
    passport.authenticate('local', (err, user, info)=>{ 

      // this callback custom cb extend more control  
      // when we throw error from passport strategy ( password not or user not found )

      if(!user) return res.send("User not Found")

      req.logIn(user, function(err){
        if(err) return next(err)
        res.send(user)
      })
    })(req, res, next)
   
  } catch(ex){    
    const errors = {}     
    if(ex.error){
      for(let error of ex.error.details){
        errors[error.path[0]] = error.message
      }
    }
    return res.send(errors) 
  }
})



router.post('/auth/register', async (req, res, next)=>{
  const schema = Joi.object({
    username:Joi
      .string()
      .min(3)
      .required(),
    email: Joi
      .string()
      .email({minDomainSegments:2, tlds:{allow:['com', 'net']}})
      .required(),
    password: Joi
      .string()
      .min(3)
      .required(),
    confirmPassword: Joi
      .string()
      .min(3)
      .required(),
  })

  try{
    const { error } = schema.validate(req.body, { abortEarly: false })    
    if(error){
      let customError = new Error()
      customError.statusCode = 401;
      customError.error = error;
      throw customError;
    }

    let user = await User.findOne({email: req.body.email})
    if(user){
      const newError = { details:[{message: 'This Email Already registered', path:['email']}] }

      let customError = new Error();
      customError.statusCode = 401;
      customError.error = newError
      throw customError;
    }

    if(req.body.password !== req.body.confirmPassword){
      const newError = { details:[{message: "password Does'nt match", path:['confirmPassword']}]} 
      let customError = new Error();
      customError.statusCode = 401;
      customError.error = newError
      throw customError;
    }

    let salt = await bcryptjs.genSalt(10)    
    let hashedPassword = await bcryptjs.hash(req.body.password, salt)

    user = await new User({..._.pick(req.body, ['email', 'username']), password: hashedPassword}).save()
    res.send('Resigter Success')
    
  } catch(ex){
    let errors = {}
    if(ex.error){
      for(let error of ex.error.details){
        errors[error.path[0]] = error.message
      }
    }    
    res.send(errors)
  }
})



// Logout Route..........
router.get('/auth/logout', (req, res, next)=>{
  req.logout();
  res.send('Logout Success......')
})


// currentUser Route.......
router.get('/auth/currentUser', (req, res, next)=>{ 
  res.send(req.user)
})


module.exports = router