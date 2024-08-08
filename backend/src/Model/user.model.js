const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required : true
    },

    email : {
      type: String,
      required : true
    },
    
    files : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
        }
    ],
    BuyPlan : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BuyPlan",
        }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;