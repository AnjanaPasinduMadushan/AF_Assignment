const User = require('../model/user');
const OTP = require('../model/otp')
//importing bcrypt
const bcrypt = require("bcrypt");
const emailsent = require('./email-controller')

//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//importing Validations
const { checkingMobileValidation, nicValidation, validateEmail, validatePWD, RandomOTP } = require("../Validation/user_validation");

//user id, checking_in and user's role is passed with token
const createToken = (_id, role) => {
  console.log(process.env.SECRET)
  return jwt.sign({ _id, role }, process.env.secret, { expiresIn: '1d' })
}

//signup function
const signUp = async (req, res, next) => {

  const { name, NIC, mobile, email, password, role, checkingIn, emailVerification } = req.body;
  //validation for all the input fields
  if (!name || !NIC || !mobile || !email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  //validation
  if (!checkingMobileValidation(mobile)) {
    return res.status(400).json({ message: "Please provide valid mobile Number with 10 digits" })
  }
  else if (!nicValidation(NIC)) {
    return res.status(400).json({ message: "Please provide valid NIC Number with 9 digits with v/V or 12 digits" })
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }
  else if (!validatePWD(password)) {
    console.log(password)
    return res.status(400).json({ message: "Please provide valid Password" })
  }



  let existingUser;
  //chaecking whether user already sign up or not based on the email
  try {
    existingUser = await User.findOne({ $or: [{ NIC: NIC }, { email: email }, { mobile: mobile }] });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    if (existingUser.NIC == NIC) {
      return res.status(409).json({ message: "A User is already signUp with this NIC" })
    }
    else if (existingUser.email == email) {
      return res.status(409).json({ message: "A User is already signUp with this email" })
    }
    else if (existingUser.mobile == mobile) {
      return res.status(409).json({ message: "A User is already signUp with this mobile" })
    }

  }

  const salt = await bcrypt.genSalt(6)
  //hashsync is a function that can hasing the password
  const hashedpassword = await bcrypt.hash(password, salt);


  //creating a new User
  const user = new User({
    name,
    NIC,
    mobile,
    email,
    password: hashedpassword,
    role: role || "citizen",
    checkingIn,
    emailVerification
  });

  try {
    await user.save().then((result) => {
      sendOptVerifcation(result, res)
    })
    return res.status(201).json({ message: "Your Account Creation Request is sent to the authorities", User: user })//sending the new user details with token as a message for the response
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error in saving user in DB" })
  }

}

const sendOptVerifcation = async ({ _id, email }, res) => {
  try {
    const random = RandomOTP().toString();
    console.log(random)
    const salt = 6;

    const hashedOTP = await bcrypt.hash(random, salt);

    const otp = new OTP(
      {
        userId: _id,
        otp: hashedOTP,
        email: email,
        createdAt: Date.now(),
        expiredAt: Date.now() + (3600000)
      }
    )

    await otp.save()

    let msgs = `Check your email account and verify your email\n` + random
    emailsent.sendVerificationEmail(email, msgs, function (err, msg) {
      if (err) {
        console.log(err)
      } else {
        console.log(msg);
      }
    })

  } catch (err) {
    console.log(err)
  }
}

const verifyEmail = async (req, res) => {
  try {

    // const userId = req.params.id;
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({ message: "Both feilds should be filled" })
    } else {
      const otpEmail = await OTP.findOne({ email })


      if (!otpEmail) {
        return res.status(404).json({ message: "You have already verified, have not registered yet or incorrct Email!!!" })
      } else {
        const otpUid = otpEmail.userId;
        // const { expiredAt } = otpSend[0];
        const hashedOTP = otpEmail.otp;

        if (otpEmail.expiredAt < Date.now()) {
          await OTP.findOneAndDelete({ email });

          return res.status(400).json({ message: "OTP is expired" })
        } else {
          const checkOtp = bcrypt.compareSync(otp, hashedOTP)

          if (!checkOtp) {
            return res.status(404).json({ message: "You have entered an invalid OTP" })
          }
          else {
            await User.findByIdAndUpdate({ _id: otpUid }, { emailVerification: true })
            await OTP.findOneAndDelete({ email })

            return res.status(200).json({ message: "Email is verified. Wait for NIC verification message!!!" })
          }
        }
      }
    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in verifing email" })
  }
}

// const resendOTP = async (req, res) => {

//   try {

//     let { userId, email } = req.body;

//     if (!userId || !email) {
//       return res.status(400).json({ message: "All Feilds must be filled" })
//     } else {
//       await OTP.deleteMany({ userId })
//       emailsent.sendVerificationEmail({ _id: userId, email }, res)
//     }

//   } catch (err) {
//     console.log()

//     return res.status(500).json({ message: "Error when Resending OTP" })
//   }
// }


const login = async (req, res, next) => {

  const { email, password } = req.body;

  console.log(email, password)

  //checking whether pasword and login fields are filled or not 
  if (!email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  let loggedUser;

  try {
    loggedUser = await User.findOne({ email: email })
  } catch (err) {
    console.log(err)
  }

  if (!loggedUser) {
    return res.status(404).json({ message: "User is not found. Sign Up instead" })
  }
  else {
    if (!loggedUser.checkingIn) {
      return res.status(401).json({ message: "You do not have permission to login. Wait until the verification email!!!" })
    }
    else {
      //checking password and comare it with exist user's password in the db
      const isPasswordCorrect = bcrypt.compareSync(password, loggedUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" })
      }
      const token = createToken(loggedUser._id, loggedUser.role)


      //Create and setting a cookie with the user's ID and token
      res.cookie(String(loggedUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,//if this option isn't here cookie will be visible to the frontend
        sameSite: "lax"
      })

      //we send this msg along with the token and user details
      return res.status(200).json({ message: "Successfully logged in", User: loggedUser, token })
    }
  }

}

//update the CheckingIn
const updateCheckingIn = async (req, res, next) => {

  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { checkingIn: req.body.checkingIn }
    }, { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User is not found' })
    }

    let msgs = 'Your account request is verified. Login to your account using your creditials'
    emailsent.sendVerificationEmail(user.email, msgs, function (err, msg) {
      if (err) {
        console.log(err)
      } else {
        console.log(msg);
      }
    })

    return res.status(200).json({ message: 'User is verified' })

  } catch (err) {
    console.log(err)
    return res.status(500).json("error in update checking in")

  }

}

const unverifiedUser = async (req, res, next) => {

  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({ message: 'User is not found' })
    }
    let msgs = `Your account creation request is unverified. Check your entered NIC (${user.NIC}) again and request`
    emailsent.sendVerificationEmail(user.email, msgs, function (err, msg) {
      if (err) {
        console.log(err)
      } else {
        console.log(msg);
      }
    })
    return res.status(200).json({ message: "Account unverified successfull!!!" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in unveried user" })

  }
}

const getNewUsers = async (req, res, next) => {


  let users;
  try {
    users = await User.find({ checkingIn: false, emailVerification: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json("error in fetching users")
  }

  if (!users) {
    return res.status(404).json({ message: 'Users are not found' })
  }
  else {
    return res.status(200).json({ users })
  }

}

const getOldUsers = async (req, res, next) => {

  const userId = req.params.id;

  let users;
  try {
    users = await User.find({ checkingIn: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json("error in fetching users")
  }

  if (!users) {
    return res.status(404).json({ message: 'Users are not found' })
  }
  else {
    return res.status(200).json({ users })
  }

}

const getOwnAcc = async (req, res, next) => {

  const userId = req.userId;

  try {

    const user = await User.findById(userId, "-password")


    if (!user) {
      return res.status(404).json({ message: "User is not found" })
    }
    else {
      res.status(200).json({ user })

    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting your Account" })

  }
}

const deleteAcc = async (req, res, next) => {

  const userId = req.userId;
  const pwd = req.body.password;

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User is not found" })
    } else {
      const isPasswordCorrect = bcrypt.compareSync(pwd, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Password is incorrect. Try again!!!" })
      }

      await User.findByIdAndDelete(userId)
      res.clearCookie(`${req.userId}`);
      req.cookies[`${req.userId}`] = "";
      return res.status(200).json({ message: "Your account is deleted" })
    }


  } catch (err) {
    return res.status(500).json({ message: "Error in deleting your Account" })
  }
}

const updateAcc = async (req, res, next) => {
  const userId = req.userId;
  const { name, mobile, email } = req.body;

  //validation
  if (!checkingMobileValidation(mobile)) {
    return res.status(400).json({ message: "Please provide valid mobile Number with 10 digits" })
  }
  else if (!nicValidation(NIC)) {
    return res.status(400).json({ message: "Please provide valid NIC Number with 9 digits with v/V or 12 digits" })
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }
  else if (!validatePWD(password)) {
    console.log(password)
    return res.status(400).json({ message: "Please provide valid Password" })
  }

  try {
    // Check if email or mobile already exist for another user
    const existingUser = await User.findOne({ $or: [{ mobile: mobile }, { email: email }] });
    if (existingUser && existingUser._id != userId) {
      if (Number(existingUser.mobile) == Number(mobile)) {
        return res.status(401).json({ message: "This mobile is already exists. use a different mobile " });
      } else if (existingUser.email == email) {
        return res.status(402).json({ message: "This email is already exists. use a different email " });
      }
    }

    // Update user account
    const user = await User.findByIdAndUpdate(userId,
      {
        name,
        mobile,
        email
      }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User is not found!!!" });
    }
    return res.status(200).json({ message: "User is successfully updated!", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in updating user" });
  }
};


//logout function
const logout = (req, res, next) => {
  const uId = req.userId;//request user Id from the token
  const cookies = req.headers.cookie;//request cookie from the header

  //exttracting token from the cookies
  const previousToken = cookies.split("=")[1];

  //if token is not found return this response
  if (!previousToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  //varifying token using secret key from the environmental variables
  jwt.verify(String(previousToken), process.env.secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });//if not verified return this error
    }

    //if token is varified return this success message as response
    res.clearCookie(`${uId}`);
    req.cookies[`${uId}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};


// const pwdUrl = async (req, res, next) => {

//   const { email } = req.body;

//   if (!email) {
//     return res.status(422).json({ msg: "Please enter your email" })
//   }

//   let oldEmail;
//   try {
//     oldEmail = await User.findOne({ email: email })
//   } catch (err) {
//     console.log(err)
//   }

//   if (!oldEmail) {
//     return res.status(404).json({ message: "Email is not found. check Your email" })
//   }

//   const token = createToken(oldEmail._id, oldEmail.role)


//   const url = `http://localhost:3000/reset-pwd/${token}`;

//   let msgs = `Click this link to reset your password\n` + url;
//   emailsent.sendVerificationEmail(oldEmail.email, msgs, function (err, msg) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(msg);
//     }
//   })

//   res
//     .status(200)
//     .json({ msg: "Re-send the password, please check your email." });
// }


// const resetPwd = async (req, res, next) => {


//   try {
//     const uId = req.userId;
//     const { password } = req.body;

//     if (!password) {
//       return res.status(422).json({ msg: "Please enter the New Password" })
//     }

//     const salt = await bcrypt.genSalt(6)
//     //hashsync is a function that can hasing the password
//     const hashedpassword = await bcrypt.hash(password, salt);

//     await User.findByIdAndUpdate(uId, {
//       $set: { password: hashedpassword }
//     })

//     return res.status(200).json({ msg: "Password Updated Successfully!!!" })
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({
//       msg: "something is wrong in the process"
//     })
//   }


// }

exports.signUp = signUp;
exports.login = login;
exports.updateCheckingIn = updateCheckingIn;
exports.unverifiedUser = unverifiedUser;
exports.getOwnAcc = getOwnAcc;
exports.deleteAcc = deleteAcc;
exports.updateAcc = updateAcc;
exports.getNewUsers = getNewUsers;
exports.getOldUsers = getOldUsers;
exports.logout = logout;
// exports.pwdUrl = pwdUrl;
// exports.resetPwd = resetPwd;
exports.verifyEmail = verifyEmail;
// exports.resendOTP = resendOTP;
