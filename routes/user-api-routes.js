var bcrypt = require("bcryptjs");
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticatedAPI = require("../config/middleware/isAuthenticatedAPI");

module.exports = function (app) {

    // https://stackoverflow.com/questions/57293115/passport-deserializeuser-not-being-called

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', (err, theUser, failureDetails) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong authenticating user' });
                return;
            }
    
            if (!theUser) {
                console.log("!theUser",err, theUser, failureDetails)
                res.status(401).json(failureDetails);
                return;
            }
    
            // save user in session
            req.login(theUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Session save went bad.' });
                    return;
                }
                res.send(req.user);
                //res.status(200).json({errors: false, user: theUser});
            });
        })(req, res, next);
    });

    
    app.get("/api/logout", function (req, res) {
        console.log("logout successful")
        req.logout();
        res.send({
            message: 'user logged out'
        });
    });


    app.post("/api/signup", async function (req, res) {
        console.log("hello from signup " + req.body.username)
        if (!req.body.username || !req.body.password) {
            res.status(400).json({
                message: 'Please enter all fields.'
            })
        } 

        var userFound = false;
        await db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function (dbUser) {
            // If there's user with the given username
            if (dbUser) {
                // return error
                userFound = true;
                console.log("dbUser found ",dbUser)
            } else {
                userFound = false;
                console.log("dbUser not found",dbUser)
            }
        });

        if (userFound) {
            console.log("There is already user with same name.")
            res.status(400).json({message: "There is already user with same name."});
        } else {
            db.User.create({
                username: req.body.username,
                password: req.body.password
            })
            .then(function (user) {
                res.send({
                    message: 'user account created',
                    user: {
                        id: user.id,
                        username: user.username,
                    }
                });
            })
            .catch(function (err) {
                res.status(400).json(err);
            });
        }

    })


}