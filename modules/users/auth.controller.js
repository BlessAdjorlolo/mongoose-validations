const User = require("./user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    const token =jwt.sign(
        {id: user._id, email: user.email},
        "546a803d81b4ed21d8789605b4d93479cd4998154682c222fe5b850b365dc947",
        {
            expiresIn: "1h"
        }
        );
    
        return {
            token,
            user,
        };
}

exports.register = async(req, res) =>{
    const {email, password} = req.body;

   // Checking to see if the user already exist

   const emailExists = await User.findOne({email});
   if (emailExists) {
    return res.status(400).json({"error": "Email already exist"});
   }
   const hashedPassword = await bcrypt.hash(password, 12)


   const user = await User.create({...req.body, password:hashedPassword});

   //generate token
  const token = generateToken(user)

  res.status(201).json({token})
};

exports.login = async (req,res) =>{
    const {email, password} = req.body;
    let  user = await User.findOne({email})
    if(!user){
        return res.status(400).json({msg:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({msg:"Invalid Credential"});
    }

  //generate token
  const token = generateToken(user)

   res.status(200).json({token});
}