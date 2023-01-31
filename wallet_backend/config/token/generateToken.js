const jwt=require('jsonwebtoken')

const generateToken= id=>{
    return jwt.sign({id},"MYSECRET",{expiresIn:"20d"})
}

module.exports=generateToken