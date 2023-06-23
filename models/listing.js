const mongoose=require('mongoose');
const passport=require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema=mongoose.Schema;

const ListingSchema=new Schema({

    catgeory:{
        type:String,
        enum:['Hackathon',"Project","Study Group"],
        required:true
    },
    skillSetReq:{
        type:[{
            type:String
        }]

    },
    skillSetHave:{
        type:[
            {type:String}
        ]
    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    }


});
userSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("ListingSchema",ListingSchema);

//category
    //description
    // skill set required
    // skill set we have
    // title
    // ref to user