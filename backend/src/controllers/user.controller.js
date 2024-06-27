const User = require("../Model/user.model");
const Plan = require("../Model/plan.model")
const File = require("../Model/file.model");
const BuyPlan = require("../Model/BuyPlan.model")
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

    const findPlan = await Plan.findById(plan._id)
    if(!findPlan)
        return res.status(400).json({message : "Plan doesn't exist"})
    
    const createSubPlan = await BuyPlan.create({
      Plan : findPlan,
      leftData : findPlan.data,
      leftFiles : findPlan.files,
      leftValidity : findPlan.days,
      isCurrent : true
    })
    if(!createSubPlan)
       return res.status(500).json({message : "Internel Issues"})

    const addedPlan = await User.findByIdAndUpdate(
      checkUser,
      {
        $addToSet: { BuyPlan :  createSubPlan._id},
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

// current plan update for uses a plan so we have to 
// decrease plan limit
const updateValidity = async(req, res) => {
  try {
    const user = req.body;
    if (!user)
      return res.status(400).json({ message: "insufficient data" });
    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;
    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });
  
    if (!existUser)
      return res
        .status(400)
        .json({ message: "User doesn't exist" });
    
    const findCurrentPlans = await  BuyPlan.find({
      $and : [!{isCurrent : false}, !{leftValidity : 0}]
    })

    if(!findCurrentPlans)
       res.status(400).json({message: "your all plans validity has been finished"})
    
    findCurrentPlans.forEach(element => {
      element.leftValidity =  element.leftValidity - 1
    });
 //! doubt to implement...

  } catch (error) {
     console.log("updateValidity", error);
  }

       
}

//!
const changeisActivate = async(req, res) => {
     const {bn} = req.body
}


//!
const fetchPlan = async (req, res) => {
  try {
    const user = req.body;
    if (!user) return res.status(400).json({ message: "Insufficient data" });
    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;
    const findUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!findUser)
      return res.status(400).json({ message: "User doesn't exist" });
    
    res
      .status(200)
      .json({
        planData,
        message: "Sucessfully fetched user's plan and current spent plan",
      });
  } catch (error) {
    console.log("fetchPlan", error);
  }
};


//!
const updateUser = async (req, res) => {
  const { user } = req.body;
};


//!
const fetchPurchashedPlans = async (req, res) => {
  try {
    const userdata = req.body;
    console.log(req.body);
    if (!userdata) return res.status(400).json({ message: "Insufficient data" });
    const email = userdata.email;
    const username = userdata.username;

    const checkUser = await User.findOne({
      $or: [{ email }, { username }]
    })
      .populate({
        path: 'BuyPlan',
        populate: {
          path: 'Plan'
        }
      });
    
    if (checkUser) {
      res.status(200).json({ result: checkUser, message: "Successfully fetched previous plans" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
      
    // ;
    // if (!checkUser)
    //   return res.status(400).json({ message: "User doesn't exist" });
    // const BuyPlan = checkUser.BuyPlan;
    
  } catch (error) {
    console.log("fetchPurchashedPlans", error);
  }
};


module.exports = {
  register,
  login,
  addPlan,
  fetchPlan,
  updateUser,
  fetchPurchashedPlans,
  updateValidity
};
