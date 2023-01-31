const express = require('express');
const {userRegister,userLogin,credit,allUsers} = require('../controllers/userController')


const userRoutes = express.Router()
userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
userRoutes.put('/credit',credit)
userRoutes.get('/allUsers',allUsers)


module.exports = userRoutes