require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require("mongoose-findorcreate");

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "ourlittlesecret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-hacker:Hacker123@cluster0.zsn95.mongodb.net/userLogin", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    title: String,
    author: String,
    description: String,
    image: Image,
    pagecount: Number
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/register", function (req, res) {
    res.render("register")
});

app.get("/addbooks", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("addbooks");
    } else {
        res.redirect("/login");
    }
});

app.get("/books", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("books");
    } else {
        res.redirect("/login");
    }
});

app.get("/view", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("view")
    } else {
        res.redirect("/login")
    }
});

app.get("/author", function (req, res) {
    res.render("author")
});

app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
});

app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register")
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/books")
            });
        }
    });
});

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/books")
            });
        }
    });
});

app.post("/addbooks", function(req, res) {
    const 
})

app.put("/addbooks", function(req, res) {
    
})

app.listen(3000, function () {
    console.log("Server Started on 3000");
});