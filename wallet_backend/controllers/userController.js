const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const generateToken = require("../config/token/generateToken")




// User Registration

exports.userRegister = expressAsyncHandler(async (req,res) => {
    //Check if Phone number already used
    const userExists = await User.findOne({ phone: req.body.phone })
   
    console.log(req.body);
    try {
        // if (userExists) throw new Error("Phone number already used")
        if (userExists) {
         res.status(500).json({
            message:"Phone number already used"
         })
            // throw new Error("Phone number already used")
        }
        else{
        const user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
        })
        // res.json(user)
        res.status(200).json({
            success: true,
            message:"Successfully registered",
            user
        })
    }
    } catch (error) {
         
        res.json(error)
    }
})

// User login

exports.userLogin = expressAsyncHandler(async (req,res)=>{
    const OTP = "1234"
    const {id,phone,otp} = req.body;
console.log(req.body)
     //check if user exists
     const userFound = await User.findOne({ phone });

     //Check if password is match
    if (userFound && (OTP == otp) && (id == userFound?._id)) {
        res.json({
            _id: userFound?._id,
            name: userFound?.name,
            phone: userFound?.phone,
            token: generateToken(userFound?._id),
            isVerified: userFound?.isAccountVerified,
        });
       
    } else {
        res.status(401).json({
            success: false,
        message: "Invalid"});
        throw new Error("Invalid Login Credentials");
    }

})

//user wallet credit
exports.credit = expressAsyncHandler(async (req,res)=> {

    console.log('1111');
    const {id,credit} = req.body;
    console.log(req.body,'wallet');
    try {
        const a = await User.findOne({_id:id})
        console.log("amount",a.amount)
       
        const wallet = await User.findByIdAndUpdate({_id : id},{
            $inc:{
                'amount':credit
            }
        })
     
        res.status(200).json({
            success: true,
            message:`${credit} is credited to your account`,
            wallet
        })
    } catch (error) {
        res.json(error)
        
    }
 
})


//All users
exports.allUsers = expressAsyncHandler(async (req,res)=> {

    // const {id} = req.body
    // console.log('id',id);
   
    try {
        const users = await User.find()
        // const users = user.filter((e) => !e._id.includes(id))
        if (!users) {
            return next(new ErrorHander(`NO Records found`, 400));
          }
        
          res.status(200).json({
            success: true,
            users
          });
    } catch (error) {
        res.json(error)
        
    }
 


})