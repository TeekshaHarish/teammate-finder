const express = require("express"); //done
const bodyParser = require("body-parser"); //done
const mongoose = require("mongoose"); //done
const ejs = require("ejs"); //done
const passport = require("passport"); //done
const passportLocalMongoose = require("passport-local-mongoose"); //done
const ejsMate = require("ejs-mate"); //done
const LocalStrategy = require("passport-local");
const path = require("path");
const UserSchema=require('./models/users')
const session = require("express-session"); //done
const ListingSchema=require('./models/listing');

const app = express();
app.use(
  session({
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
// passport initializations
passport.use(UserSchema.createStrategy());
passport.use(new LocalStrategy(UserSchema.authenticate()));

passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());
app.use(passport.session());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));
useUnifiedTopology: true;

// the isLoggedIn middleware
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send("You must be logged in first");
  } else {
    next();
  }
};

// This middleware would store the user in locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// connecting database

mongoose.connect(
    "mongodb+srv://siddharthgoel2105:sidd2105@cluster0.jmer3iz.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connectioon error:"));
  db.once("open", () => {
    console.log("Database connected");
  });

  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });

  app.get('/',(req,res)=>{
    res.render('home');
  })

  app.get('/listings',(req,res)=>{
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
    //dashboard
    res.render('users/profile');
  })

  app.get('/listings/new',(req,res)=>{
    res.render('listing/new');
  })

  app.post('/listings',async (req,res)=>{
    const newlist=await new ListingSchema(req.body.listing);
    await newlist.save();
    res.send('POST');
    res.redirect('listing');
  })

  app.get('/listings/:id',(req,res)=>{
    res.render('listing/show');
  })

  app.get('/listings/:id/edit',(req,res)=>{
    res.render('listing/edit');
  })

  app.put('/listings/:id',(req,res)=>{
    res.redirect('listing');
  })

  app.delete('/listing/:id',(req,res)=>{
    res.redirect('listing');
  })



// creating post request to register a user
  app.post("/register", async function (req, res) {
    console.log(req.body);

    const user = await new UserSchema(req.body.user);

    const newUser = await UserSchema.register(user, req.body.password);
    await newUser.save();
    // res.redirect("/login");
    res.send("It worked!!")
  });
  app.post(
    "/login",
    passport.authenticate("local", { failureFlash: false, failureRedirect:'/' }),
    async (req, res) => {
      const user = await UserSchema.findOne({ username: req.body.username });
      // console.log(user);
      console.log(req.body.username);
      console.log(req.body.password);
  
      // res.redirect(`new/${user.username}`);
      res.send('Hogaya login')
    }
  );