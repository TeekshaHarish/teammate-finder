const mongoose=require('mongoose');
const passport=require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema=mongoose.Schema;
const userSchema= new Schema({
    //category
    //description
    // skill set required
    // skill set we have
    // title
    // ref to user
    // 
})
userSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("UserSchema",userSchema)