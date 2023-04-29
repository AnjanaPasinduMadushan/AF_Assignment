const User = require('../model/user');

//importing bcrypt
const bcrypt = require("bcrypt");

//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//user id, checking_in and user's role is passed with token
const createToken = (_id, role) => {
    console.log(process.env.SECRET)
   return  jwt.sign({_id, role}, process.env.secret, {expiresIn: '60s'})
}

//signup function
const signUp = async (req, res, next) => {

    const { name, age, NIC, mobile, email, password, role, checkingIn } = req.body;
    //validation for all the input fields
    if (!name ||!age ||!NIC ||!mobile || !email || !password) {
      res.status(422).json({message:"All feilds should be filled"})
    }
 
  
    let existingUser;
    //chaecking whether user already sign up or not based on the email
    try {
      existingUser = await User.findOne({ email : email });
    } catch (err) {
      console.log(err);
    }
  
    if (existingUser) {
      return res.status(400).json({ message: "User already exist...login instead " })
    }
  
    const salt = await bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);
  
  
    //creating a new User
    const user = new User({
      name,
      age,
      NIC,
      mobile,
      email,
      password: hashedpassword,
      role: role || "citizen",
      checkingIn
    });
  
    try {
      await user.save();//saving document(a new user to) into DB
  
      res.status(201).json({ message: "Your Account Creation Request is sent to the authorities", User:user })//sending the new user details with token as a message for the response
    } catch (err) {
      console.log(err);
      res.status(400).json({message:"Error in saving user in DB"})
    }
  
  }

  const login = async(req, res, next) =>{

    const {email, password} = req.body;

    console.log(email, password)

    //checking whether pasword and login fields are filled or not 
    if (!email || !password) {
        res.status(422).json({message:"All feilds should be filled"})
    }

    let loggedUser;

    try{
        loggedUser = await User.findOne({email:email})
    }catch(err){
        console.log(err)
    }

    if(!loggedUser){
        res.status(404).json({message:"User is not found. Sign Up instead"})
    }

    else{
        if(!loggedUser.checkingIn){
            res.status(401).json({message:"You do not have permission to login"})
        }
        else{
            const token = createToken(loggedUser._id, loggedUser.role)
    
    
            //Create and setting a cookie with the user's ID and token
            res.cookie(String(loggedUser._id), token, {
                path: "/",
                expires: new Date(Date.now() + 1000*60),
                httpOnly:true,//if this option isn't here cookie will be visible to the frontend
                sameSite:"lax"
              })
        
              //we send this msg along with the token and user details
          return res.status(200).json({ message: "Successfully logged in", User: loggedUser, token })
        }
    }

  }

  //update the CheckingIn
  const updateCheckingIn = async(req, res, next)=>{

    const userId = req.params.id;

    try{
         await User.findByIdAndUpdate(userId, {
            $set:{checkingIn:req.body.checkingIn}
        }, {new:true}
        )

        res.status(200).json({message:'User is verified'})
       
    }catch(err){
        res.status(500).json("error in update checking in")
        console.log(err)
    }

  }

  const unverifiedUser = async(req, res, next) =>{

    const userId = req.params.id;

    try{
        await User.findByIdAndDelete(userId)
        res.status(200).json({message:"Account unverified successfull!!!"})
    }catch(err){
        res.status(200).json({message:"Error in unveried user"})
        console.log(err)
    }
  }


  exports.signUp = signUp;
  exports.login = login;
  exports.updateCheckingIn = updateCheckingIn;
  exports.unverifiedUser = unverifiedUser;
  