const mongoose = require("mongoose");
const BuyPlanSchema = mongoose.Schema(
  {

    isActivate: {
      type: Boolean,
      default : false
    },

    isCurrent: {
      type: Boolean,
      default : false
    },

    Plan: {
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
    timestamps: true
  }
);

const BuyPlan = mongoose.model("BuyPlan", BuyPlanSchema);
module.exports = BuyPlan;