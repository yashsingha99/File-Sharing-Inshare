const User = require("../Model/user.model");

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

const updatePlan = async (req, res) => {
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
    const updateUser = await User.findByIdAndUpdate(
      checkUser._id,
      {
        premium: plan,
      },
      {
        new: true,
      }
    );
    if (!updatePlan)
      return res.status(500).json({ message: "Interenal Issue " });
    res
      .status(200)
      .json({ updateUser, message: "Sucessfully updated new plan" });
  } catch (error) {
    console.log("updatePlan", error);
  }
};

const fetchPlan = async (req, res) => {
try {
     const user = req.body;
     if(!user)
        return res.status(400).json({message : "Insufficient data"})
     const email = user.emailAddresses[0].emailAddress;
     const username = user.username;
     const findUser = await User.findOne({
      $or : [{email},{username}]
     })
     if(!findUser)
       return res.status(400).json({message : "User doesn't exist"})
     const planData = {premium : findUser.premium, spent : {fileCount : findUser.fileCount, totalStorage : findUser.totalStorage}}
     res.status(200).json({planData, message : "Sucessfully fetched user's plan and current spent plan"})
} catch (error) {
  console.log("fetchPlan", error);
}

};

const updateUser = async (req, res) => {};



module.exports = { register, login, updatePlan, fetchPlan, updateUser };
