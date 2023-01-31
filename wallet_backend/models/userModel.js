const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"]
        },
        phone:{
            type: Number,
            required:[true,"Number is required"]
        },
        amount:{
            type:Number,
            default:0
        }
    }
)

module.exports = mongoose.model("User", userSchema);