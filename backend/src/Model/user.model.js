const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],

    Plan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeftPlan",
      },
    ],

  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
