var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var cors = require("cors");
var db = require("./models");
var seed = require("./seeders/seed.js");

var app = express();
var PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(
    cors({
      origin: ["http://localhost:3000", "https://mern-passport-example.herokuapp.com"], // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );

// We need to use sessions to keep track of our user's login status
app.use(session({ 
    secret: "keyboard cat", 
    resave: true, 
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Define Routes for API 
require("./routes/user-api-routes.js")(app);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


// Change this flag to enable/disable recreating database.
var recreateDB = true;

if (recreateDB) {
    db.sequelize.sync({force:true})
    .then(function() {
        seed.createUsers();
        app.listen(PORT, async function() {
            console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        });
    });    
} else {
    db.sequelize.sync()
    .then(function() {
        app.listen(PORT, async function() {
            console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        });
    });    
}
