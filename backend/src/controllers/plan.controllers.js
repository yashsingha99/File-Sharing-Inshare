const User = require("../Model/user.model");
const File = require("../Model/file.model");
const Plan = require("../Model/plan.model");

const createPlan = async (req, res) => {
  try {
    const days = req?.days ? req.days : 1;
    const files = req?.file ? req.file : 2;
    const data = req?.data ? req.data : 2;
    const rupees = req?.rupees ? req.rupees : 0;
    const newPlan = await Plan.create({
      days,
      files,
      data,
      rupees,
    });

    if (!newPlan) res.status(400).json({ message: "Internal issue" });

    res.status(200).json({ newPlan, message: "successfully created new plan" });
  } catch (error) {
    console.log("createPlan", error);
  }
};

const updatePlan = async (req, res) => {
try {
      const { plan, details } = req.body;
      if (!plan || !details)
        return res.status(400).json({ message: "Insufficient data" });
    
      const updatedPlan = await plan.findByIdAndUpdate(
        plan._id,
        {
          days: details?.days,
          files: details?.files,
          data: details?.data,
          rupees: details?.rupees,
        },
        {
          new: true,
        }
      );
    
      if (!updatedPlan)
        return res.status(400).json({ message: "plan doesn't exist" });
      res.status(200).json({updatedPlan, message : "plan sucessfully updated"})
} catch (error) {
    console.log("updatePlan", error);
}
};

const deletePlan = async (req, res) => {
  try {
      const plan = req.body;
      if(!plan)
         return res.status(400).json({message : "insufficient data"})
      const deletedPlan = await Plan.deleteOne({_id : plan._id})
      if(!deletedPlan)
         return res.status(400).json({message : "plan doesn't exist"})
      res.status(200).json({deletedPlan, message : "sucessfully deleted"})
  } catch (error) {
      console.log("deletePlan", error);
  }
};

const fetchAllPlans = async (req, res) => {};

module.exports = {
  createPlan,
  updatePlan,
  deletePlan,
  fetchAllPlans,
};
