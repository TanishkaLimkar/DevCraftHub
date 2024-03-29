const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    email :{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default : false
    }
});
//secure the password with bcrypt

userSchema.pre('save', async function(){
    const user =this;
    if(!user.isModified("password"))
    {
        next();//it will go to perform next action that is loading the data in the database

    }

    try{
         const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    }catch(error)
    {
        next(error);
    }
});
//compare password  

userSchema.methods.comparePassword= async function(password){

    return bcrypt.compare(password, this.password);
};
//JSON web token
userSchema.methods.generateToken = async function() {
     try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
            //this three data are used for verification of JWT in future
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
        )
     } catch (error) {
        console.error(error);
     }
};//with methods we can create ny number of functions



//define the model or collection name

const User = new mongoose.model("User",userSchema);

module.exports = User;