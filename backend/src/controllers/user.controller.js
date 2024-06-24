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
    const validValue = plan?.Validity ? plan?.Validity : 0;
    const filevalue = plan?.file ? plan?.file : 0;
    const dataValue = plan?.data ? plan?.data : 0;

    const updateUser = await User.findByIdAndUpdate(
      checkUser._id,
      {
        $inc: {
          Validity: validValue,
          file: filevalue,
          data: dataValue,
        },
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
    if (!user) return res.status(400).json({ message: "Insufficient data" });
    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;
    const findUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!findUser)
      return res.status(400).json({ message: "User doesn't exist" });
    const planData = {
      premium: findUser.premium,
      spent: {
        fileCount: findUser.leftFiles,
        totalStorage: findUser.leftData,
        validity: findUser.leftValidity,
      },
    };
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

const updateUser = async (req, res) => {
  const { user } = req.body;
};

const decreaseValidity = async (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ message: "Insufficient data" });
  const email = user.emailAddresses[0].emailAddress;
  const username = user.username;
  const checkUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!checkUser)
    return res.status(400).json({ message: "User doesn't exist" });
  const decrValidity = await User.findByIdAndUpdate(checkUser._id, {
    $dec: { leftValidity: 1 },
  });
};

const fetchPrevoiusPlans = async (req, res) => {
  try {
    const user = req.body;
    if (!user) return res.status(400).json({ message: "Insufficient data" });
    const email = user.emailAddresses[0].emailAddress;
    const username = user.username;
    const checkUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!checkUser)
      return res.status(400).json({ message: "User doesn't exist" });
    const previousPlans = checkUser.previosPlan;
    res
      .status(200)
      .json({ previousPlans, message: "successfully previous plans fetched" });
  } catch (error) {
    console.log("fetchPrevoiusPlans", error);
  }
};


module.exports = {
  register,
  login,
  addPlan,
  fetchPlan,
  updateUser,
  decreaseValidity,
  fetchPrevoiusPlans,
};
