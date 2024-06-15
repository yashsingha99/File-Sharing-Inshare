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

    premium: {
      type : Object,
      default:{    
        name : "basic",
        storage : 5,
        numberOfFiles : 10,
        price : 0
      }
    },
    totalStorage : {
     type : Number,
     default : 0,
    },
    fileCount :{
      type: Number,
      default : 0
    }
  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

const User =  mongoose.model("User", userSchema)
module.exports = User