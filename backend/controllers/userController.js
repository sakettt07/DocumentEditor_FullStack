const userModel = require("../models/userModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const signUpControl = async (req, res, next) => {
  try {
    let { username, name, email, password, phone } = req.body;
    let emailCon = await userModel.findOne({ email: email });
    if (emailCon) {
      return res.json({ success: false, message: "email already exists" });
    }
    let phoneCon = await userModel.findOne({ phone: phone });
    if (phoneCon) {
      return res.json({
        success: false,
        message: "phone number already exists",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) throw err;
          let user = await userModel.create({
            username,
            email,
            phone,
            name,
            password: hash,
          });
          res.json({ success: true, message: "User created successfully" });
        });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const loginControl=async (req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email});
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    var token=jwt.sign({email:user.email,userID:user._id},process.env.SECRET)
                    res.json({success:true,message:"Login Successfully",userID:user._id,token:token})
                }
                else{
                    res.json({success:false,message:"Invalid Password"})
                }
            });
        }
        else{
            res.json({success:false,message:"invalid email"})
        }
    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    }
}
module.exports = { signUpControl,loginControl };
