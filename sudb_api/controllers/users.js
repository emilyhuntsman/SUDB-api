require('dotenv').config()

const express = require("express");
const users = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user.js");
//HMAC SHA256 synchronous sign in
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECURITY_TOKEN = process.env.SECURITY_TOKEN;

users.use(bodyParser.urlencoded({ extended: true }));
users.use(express.json());

users.post("/login", (req, res) => {
  console.log('hello', req.body)

  User.findOne({ username: req.body.user }, (err, user) => {
    console.log('findone', user)
    if (err) {
      res.status(400).json({ error: err.message });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      let securityToken = jwt.sign(
        { username: user.username },
        SECURITY_TOKEN,
        { expiresIn: "1h" });
      console.log(user);
      res.status(200).json({
        username: user.username,
        securityToken: securityToken
      });
    } else {
      res.status(401).json({ message: "username/password not found" })
    }
    //   let isAuth = false

    //   bcrypt.compareSync(req.body.password, user.password, function (err, result) {
    //     console.log('bcrypt hit')
    //     isAuth = true;
    //     let securityToken = jwt.sign(
    //       {
    //         username: user.username
    //       },
    //       SECURITY_TOKEN,
    //       {
    //         expiresIn: '1hr'
    //       }
    //     );
    //     res.status(200).json({
    //       username: user.username,
    //       token: securityToken,
    //       auth: isAuth,
    //     })
    //   })
    //   if (isAuth === false) {
    //     res.status(400).json({ message: 'Username/Password Not Found', auth: isAuth })
    //   }
    // });
  });
});

users.post("/", async (req, res) => {
  console.log(req.body);
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdUser);
  });
});

users.get("/", (req, res) => {
  User.find({}, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundUser);
  });
});

users.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

users.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUser);
    }
  );
});

// users.get("/login/:user/:pw", (req, res) => {
//   User.findOne({ 'username': req.params.user }, (err, foundUser) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json(foundUser);
//   });
// });





// users.post("/createUser", chatCtrl.createNewUser);
// users.post("/confirmUser", chatCtrl.authenticate);

module.exports = users;
