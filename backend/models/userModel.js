const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String
    },
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("User",userSchema);