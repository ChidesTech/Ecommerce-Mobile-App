const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{type: String},
    email:{type: String, unique:true},
    password:{type: String},
    verificationToken : {type : String},
    isVerified:{type: Boolean, default: false},
    isAdmin:{type: Boolean, default: false},
    isSuper:{type: Boolean, default: false},
},{timestamps: true}
);
 
const User  = mongoose.model("User", userSchema);

 module.exports = User 

