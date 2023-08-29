const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true, 'field cannot be empty'],
        minlength:3
    },
    lastName:{
        type:String,
        trim:true,
        required:[true, 'field cannot be empty'],
        minlength:3
    },
    email: {
        type:String,
        trim: true,
        required: [true, 'Email cannot be empty'],
        unique: true,
        validate: {
            validator: function(value) {
                // Regular expression to validate email addresses
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(value);
            },
            message: 'Please enter a valid email address (e.g., abc@example.com)'
        }
    },
    password: {
        type: String,
        trime:true,
        required: [true, 'Password cannot be empty'],
        minlength: 6,
        validate: {
            validator: function(value) {
                // Check for at least one uppercase letter (A-Z)
                const uppercaseRegex = /[A-Z]/;
    
                // Check for at least one lowercase letter (a-z)
                const lowercaseRegex = /[a-z]/;
    
                // Check for at least one digit (0-9)
                const digitRegex = /[0-9]/;
    
                // Check for at least one of the special symbols !, @, or #
                const specialSymbolRegex = /[!@#]/;
    
                // Check if all conditions are met
                return (
                    uppercaseRegex.test(value) &&
                    lowercaseRegex.test(value) &&
                    digitRegex.test(value) &&
                    specialSymbolRegex.test(value)
                );
            },
            message: 'Password must be at least 6 characters long and contain at least one A-Z, one a-z, 0-9, and one of the symbols !, @, or #'
        }
    },
    role:{
        type:Number,
        default:0
    }
}, {timestamps:true})

//password must be encrypted before saving in the database...
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//returing token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.REACT_APP_JWT_SECRET, {
        expireIn:10*60*1000
    });
}

module.exports = mongoose.model("user", userSchema);