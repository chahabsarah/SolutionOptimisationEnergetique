const User = require('../models/UserModel');
const authMiddleware = require('../middleware/authMiddleware');
let jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');
const Notification = require('../models/Notification');


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

function generateRandomPassword() {
  const length = 10; 
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomPassword = '';

  for (let i = 0; i < length; i++) {
    randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomPassword;
}
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, phone_number, localisation } = req.body;

    const generatedPassword = generateRandomPassword();
    
    const newUser = new User({ fullname, email, phone_number, localisation, password: generatedPassword });
    await newUser.save();

    const emailSubject = "Création de compte - Mot de passe généré";
    await sendEmailWithPassword(email, emailSubject, generatedPassword);

    res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

async function sendEmailWithPassword(email, emailSubject, password) {
  var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    transportMethod: "SMTP",
    secureConnection: false,
    port: 465,
    secure: true,
    auth: {
      user: "tektaitheoriginals@gmail.com",
      pass: "cvxv sflh anot dark",
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  var mailOptions = {
    from: 'tektaitheoriginals@gmail.com',
    to: email,
    subject: emailSubject,
    html: `
    <p>Voici votre mot de passe généré:</p>
    <p><strong>${password}</strong></p>
    <p>Utilisez ce mot de passe pour vous connecter à votre compte.</p>
           `

  };

  await smtpTransport.sendMail(mailOptions);
}

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  };
exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        let accessToken = createAccessToken({ id: newUser._id });
        await Notification.create({
          userId: user._id,
          message: 'Welcome back!',
          read: false,
      });

        res.status(200).json({ message: 'Login successful', user,accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
exports.googleLogin = async (req, res) => {
  try {
    const { email, given_name, family_name ,picture } = req.body;
    

    const existingUser = await User.findOne({ email });
    if (existingUser) { 
      existingUser.fullname = given_name ,family_name;
      existingUser.picture = picture;
     
      await existingUser.save();
      let accessToken = create({ id: existingUser._id });
      return res.json({ message: 'User logged in successfully', user: existingUser,accessToken });
    }
   

    const newUser = new User({
      email,
      fullname: given_name,family_name,
      picture : picture
    });
   
    await newUser.save();
    let accessToken = createAccessToken({ id: newUser._id });
    res.json({ message: 'User created and logged in successfully', user: newUser,accessToken });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: 'Failed to log in with Google', error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const currentUser = req.user;
    let findUser=await User.findById(req.user.id)
    
    res.json({result:findUser});
  } catch (error) {
   
    res.status(500).json({ message: 'Failed to fetch current user', error: error.message });
  }
};

let createAccessToken = (user) => {
  return jwt.sign(user, "sarroura", {
    expiresIn: "1d",
  });
};
