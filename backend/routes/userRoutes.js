const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const crypto = require("crypto");

const router = express.Router();



const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dnwosu008@gmail.com",
            pass: "iyyo vlqw shnw wdok"
        }
    })

    const mailOptions = {
        from: "Ecommerce App",
        to: email,
        subject: "Email Verification",
        text: `Please click the link to verify your email http://localhost:8000/api/users/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error)
    }
}


const generateSecretKey = () => {
    const seceretKey = crypto.randomBytes(32).toString("hex");
    return seceretKey;
}


const seceretKey = generateSecretKey();



router.get("/", async (req, res) => {
    const userList = await User.find().select("name email");
    if (!userList) {
        return res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("name email");
    if (!user) {
        res.status(500).json({ success: false, message: "The user wasn't found" })
    }
    res.status(200).send(user);
})


router.post("/", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin


    });
    user = await user.save();
    if (!user)
        return res.status(404).send("The user cannot be created");
    res.send(user);
});

router.post('/register', async (req, res) => {
    console.log("Hit register route")
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            return res.status(401).send({ message: 'The Email Has Already Been Used' });
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        user.verificationToken = crypto.randomBytes(20).toString("hex");
        await user.save();

        sendVerificationEmail(user.email, user.verificationToken)
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Registration Failed" })
    }

}
);

router.post("/login", async (req, res) => {
    console.log("Hit")

    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            console.log("Invalid email or password");
            return res.status(400).send({message : "Invalid email or password"});
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log({message : "Invalid Password"})
            return  res.status(401).json({message : "Invalid Password"})
        } 
        const token = jwt.sign({userId : user._id}, seceretKey);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).send({message :error});
        console.log("Login Error", error);
    }
   
   

});

router.get("/verify/:token", async(req, res) => {
   try {
    const token = req.params.token;
    const user =  await User.findOne({verificationToken : token});
    if(!user){
        return res.status(404).json({message : "Invalid Verification Token"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({message : "Email verified successfully"})
    
   } catch (error) {
    res.status.json({message : "Email Verification Failed"})
   }
})


module.exports = router;

