const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
 
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
        ref:"File"
      },
    ],
    
    currentPlan: {
      type : Object,
      default:{
        rupees : 0,    
        Validity : 1,
        file : 2,
        data : 2,
      }
    },

    leftData : {
     type : Number,
     default : 0,
    },

    leftFiles :{
      type: Number,
      default : 0
    },

    leftValidity : {
      type : Number,
      default : 0
    },

    previousPlan : [
     {
     type : mongoose.Schema.Types.ObjectId,
     ref : "Plan"
    }
    ]
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

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

const User =  mongoose.model("User", userSchema)
module.exports = User