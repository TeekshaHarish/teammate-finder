const mongoose=require('mongoose');
const passport=require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema=mongoose.Schema;
const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,    
        required:true,
        unique:true
    },
    
    college:{
        type:String,    
        required:true
       
    },
    linkedinUrl:{
        type:String,    
        required:true,
        unique:true
    },
    contact:{
        type:String,    
        required:true
    },
    username:{
        type:String,    
        required:true
    },
    description:{
        type:String,    
        required:true
        
    },
    link1:{
        type:String
    },
    link2:{
        type:String
    },
    year:{
        type:String,
        enum:['I','II','III','IV','V']
    },
    course:{
        type:String,
        enum:['B.Tech','B.E','B.Sc','BBA']

    },
    branch:{
        type:String
    },
    skillSet:{
        type:[
            {
                type:String
            }
        ]
    }

})
userSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("UserSchema",userSchema)