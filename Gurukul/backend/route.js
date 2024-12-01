const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("./usermodel");

const { JWT_SECRET } = require("./config");

router.post("/signup", (req, res) => {
  const { fullName, email, Dob, phone, password } = req.body;
  if (!fullName || !phone || !email || !Dob || !password) {
    return res.status(400).json({
      error: "One or more mandatory fields are missing",
    });
  }
  userModel
    .findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res.status(500).json({
          message: "user with this email already exist  ",
        });
      }
      bcrypt.hash(password, 16).then((hashedPassword) => {
        const user = new userModel({
          fullName,
          email,
          Dob,
          phone,
          password: hashedPassword,
        });
        user
          .save()
          .then((newUser) => {
            return res.status(201).json({
              result: "user registered successfully",
            });
          })
          .catch((err) => {
            console.log("error while singup", err);
          });
      });
    })
    .catch((err) => {
      console.log("error while save user", err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      err: "fields are empty please chek ",
    });
  }
  userModel
    .findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(400).json({
          err: "invalid credintials",
        });
      }
      bcrypt
        .compare(password, userInDB.password)
        .then((didMatch) => {
          if (didMatch) {
            const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
            const userInfo = {
              id: userInDB._id,
              email: userInDB.email,
              fullName: userInDB.fullName,
            };
            res
              .status(200)
              .json({ result: { token: jwtToken, userInfo: userInfo } });
          } else {
            res.status(401).json({
              err: "wrong password or email  ",
            });
          }
        })
        .catch((err) => {
          console.log("error in user route ", err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
