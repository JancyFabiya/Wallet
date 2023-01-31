const express = require('express');
const {userRegister,userLogin,credit} = require('../controllers/userController')


const userRoutes = express.Router()
userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
userRoutes.put('/credit',credit)


module.exports = userRoutes