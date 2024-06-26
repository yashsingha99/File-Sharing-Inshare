const mongoose = require("mongoose");
const leftPlanSchema = mongoose.Schema(
  {
    isActivate: {
      type: Boolean,
      default : false
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    leftData: {
      type: Number,
      default: 0,
    },
    leftFiles: {
      type: Number,
      default: 0,
    },
    leftValidity: {
      type: Number,
      default: 0,
    },
  },

  {
    timeStamps: true,
  }
);

const LeftPlan = mongoose.model("LeftPlan", leftPlanSchema);
module.exports = LeftPlan;
