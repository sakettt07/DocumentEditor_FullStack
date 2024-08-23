const mongoose=require("mongoose");

const docsSchema=new mongoose.Schema({
    name:{
        type:String
    },
    content:{
        type:String,
        default:""
    },
    uploadedBy:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    lastUpdate:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Docs",docsSchema);
