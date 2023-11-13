const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        reqired:[true,"Please enter user name"]
    },
    email:{
        type:String,
        required:[true,"Please enter user email"],
        unique : [true,"Email already taken"]
    }
    ,password:{
        type:String,
        reqired:[true,"Please enter password"]
    },
},{
    timestamps:true
})

module.exports= mongoose.model("Users",userSchema);