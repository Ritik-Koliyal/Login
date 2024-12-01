const express = require("express");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  Dob: {
    type: Date,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
