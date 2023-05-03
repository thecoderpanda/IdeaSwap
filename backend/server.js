const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");;
const pre_registration = require("./routes/api/pre-registration");
const role = require("./routes/api/role");
const fileUpload = require('express-fileupload');
var multer = require('multer')
var cors = require('cors');
const profile = require('./routes/api/profile');
const app = express();
const dotenv = require('dotenv');
const team = require('./routes/api/team');
dotenv.config();
require('./config/google')
const flash = require("express-flash");
const session = require("express-session");
const { OAuth2Client } = require("google-auth-library");



// Db Config
const db = require("./config/keys").mongoURI;

//Passport middileware
passport.use(passport.initialize());

//passport config will in
require("./config/passport")(passport);
app.use(fileUpload());
//Body Parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

//Connect to mongodb through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

//google config
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "http://localhost:5050/",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);
app.get("/auth/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
    res.redirect("/");
  });
});


//Use routes
app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/api", users);
app.use("/api/b4w3/pre", pre_registration);
app.use(role);
app.use("/api/team", team);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on Port ${port}`));
