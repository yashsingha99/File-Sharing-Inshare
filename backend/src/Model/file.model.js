const mongoose = require("mongoose");

const fileModel = mongoose.Schema(
  {
    filename: {
      type: String,
      required : true
    },
    path: {
      type: String,
      required : true
    },
    type:{
      type:String,
      required : true,
      default: "image"
    },
    status : {
      type : Boolean,
      default : true
    },
    size: {
      type: Number,
      required : true
    },
    password: {
      type: String,
      default : "123456"
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileModel);
module.exports = File;
