const mongoose = require("mongoose");

const fileModel = mongoose.Schema(
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


const File = mongoose.model("File", fileModel);
module.exports = File;