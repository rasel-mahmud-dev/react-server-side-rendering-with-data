const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = mongoose.model('User')


router.get('/users', (req, res, next)=>{
  User.find().then(user=>{   
    res.send(user)
  })
})



module.exports = router