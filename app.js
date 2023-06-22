const express = require("express"); //done
const bodyParser = require("body-parser"); //done
const mongoose = require("mongoose"); //done
const ejs = require("ejs"); //done
const passport = require("passport"); //done
const passportLocalMongoose = require("passport-local-mongoose"); //done
const ejsMate = require("ejs-mate"); //done
const LocalStrategy = require("passport-local");
const path = require("path");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
useUnifiedTopology: true;

// connecting database

// mongoose.connect(
//     "mongodb+srv://siddharthgoel94:sidd2105@cluster0.prx2rzr.mongodb.net/?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   );
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connectioon error:"));
//   db.once("open", () => {
//     console.log("Database connected");
//   });

  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });

  app.get('/',(req,res)=>{
    res.render('home');
  })

  app.get('/teammates',(req,res)=>{
    res.render('listing/index');
  })

  app.get('/login',(req,res)=>{
    res.render('users/login');
  })

  app.get('/signup',(req,res)=>{
    res.render('users/signup');
  })

  app.get('/user/:id',(req,res)=>{
    const {id}= req.params;
    res.render('users/profile');
  })
