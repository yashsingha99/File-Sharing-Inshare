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
        require : true
      },
      files : {
        type:Number,
        default : 0,
        require : true
      },
      days : {
        type:Number,
        default : 0,
        require : true
      },
   },
   {
    timeStamps : true
})

const Plan = mongoose.model("Plan", planSchema)

module.exports = Plan