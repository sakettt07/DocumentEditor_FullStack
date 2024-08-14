const userModel=require("../models/userModel.js");
const userControl=async(req,res,next)=>{
    try {
        let {username,name,email,password,phone}=req.body;
        let emailCon=await userModel.findOne({email:email});
        if(emailCon){
            return res.json({success:false,message:"email already exists"});
        }
        let phoneCon=await userModel.findOne({phone:phone});
        if(phoneCon){
            return res.json({success:false,message:"phone number already exists"});
        }
        else{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(password,salt,async function(err,hash){
                    if(err)throw err;
                    let user=await userModel.create({
                        username,email,phone,name,password:hash
                    });
                    res.json({success:true,message:"User created successfully"})
                })
            })
        }
    } catch (error) {
        
    }
}
module.exports={userControl}