const User = require("../Model/user.model");
const Plan = require("../Model/plan.model");
const File = require("../Model/file.model");
const BuyPlan = require("../Model/BuyPlan.model");
const stripe = require("stripe")(process.env.Secret_key);

const register = async (req, res) => {
  try {
    const user = req.body;
    if (user == undefined)
      return res.status(400).json({ message: "insufficient data" });
    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;
    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existUser)
      return res
        .status(400)
        .json({ message: "User with email or username already exists" });

    const response = await User.create({
      username,
      email,
    });

    if (!response) res.status(400).json({ message: "Internal issue" });

    res
      .status(200)
      .json({ response, message: "successfully created user account" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, email } = req.body;
  if (!username && !email) {
    return res.status(400).json("insufficient data");
  }
};

const addPlan = async (req, res) => {
  try {
    const { plan, user } = req.body;
    if (!plan || !user)
      return res.status(400).json({ message: "Insufficient data" });

    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;

    const checkUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!checkUser)
      return res.status(400).json({ message: "User doesn't exist" });

    const findPlan = await Plan.findById(plan._id);
    if (!findPlan)
      return res.status(400).json({ message: "Plan doesn't exist" });

    const createSubPlan = await BuyPlan.create({
      Plan: findPlan,
      isCurrent: true,
    });

    if (!createSubPlan)
      return res.status(500).json({ message: "Internel Issues" });

    const addedPlan = await User.findByIdAndUpdate(
      checkUser,
      {
        $addToSet: { BuyPlan: createSubPlan._id },
      },
      {
        new: true,
      }
    );

    if (!addedPlan)
      return res.status(500).json({ message: "Interenal Issue " });

    res
      .status(200)
      .json({ addedPlan, message: "Sucessfully updated new plan" });
  } catch (error) {
    console.log("addPlan", error);
  }
};

const changeisActivate = async (req, res) => {
  try {
    const buyPlan = req.body;
    if (!buyPlan) return res.status(400).json({ message: "insufficient data" });
    const change = await BuyPlan.findByIdAndUpdate(
      buyPlan._id,
      {
        isActivate: !buyPlan.isActivate,
      },
      {
        new: true,
      }
    );
    if (!change) return res.status(400).json({ message: "Plan doesn't exist" });
    return res.status(200).json({ change, message: "Succcessfully" });
  } catch (error) {
    console.log("changeisActivate", error);
  }
};

const fetchPurchashedPlans = async (req, res) => {
  try {
    const userdata = req.body;

    if (!userdata) {
      return res.status(400).json({ message: "Insufficient data" });
    }

    const { email, username } = userdata;

    // Find the user by email or username and populate the BuyPlan and Plan fields
    const checkUser = await User.findOne({
      $or: [{ email }, { username }],
    }).populate({
      path: "BuyPlan",
      populate: {
        path: "Plan",
      },
    });

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const arrOfBuyPlan = checkUser.BuyPlan;

    for (let i = 0; i < arrOfBuyPlan.length; i++) {
      const buyPlan = arrOfBuyPlan[i];

      if (buyPlan.leftValidity === buyPlan.Plan.days) {
        buyPlan.isActivate = false;

        await buyPlan.save();
      }
    }

    res.status(200).json({
      arrOfBuyPlan,
      message: "Successfully fetched previous plans",
    });
  } catch (error) {
    console.log("fetchPurchashedPlans", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchActivatedBuyPlan = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    if (!username && !email) {
      return res.status(400).json({ message: "Insufficient data" });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    })
    .populate({
      path: "BuyPlan",
      match: { isActivate: true },  
      populate: {
        path: "Plan",
      },
    })
    .select("BuyPlan");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.BuyPlan.length) {
      return res.status(400).json({ message: "You haven't purchased any active plan" });
    }

    return res.status(200).json({
      activatePlan: user.BuyPlan,
      message: "Successfully fetched active plans",
    });
  } catch (error) {
    console.error("fetchActivatedBuyPlan error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  addPlan,
  fetchPurchashedPlans,
  changeisActivate,
  fetchActivatedBuyPlan,
};
