const mongoose = require('mongoose');
const planSchema = mongoose.Schema(
   {
      rupees : {
        type:Number,
        default : 0,
        require : true
      },
      
      data : {
        type:Number,
        default : 0,
      },

      files : {
        type:Number,
        default : 0,
      },

      days : {
        type:Number,
        default : 0,
      },

      discription : {
        type : String,
      }
   },
   {
    timestamps: true
})

const Plan = mongoose.model("Plan", planSchema)

module.exports = Plan