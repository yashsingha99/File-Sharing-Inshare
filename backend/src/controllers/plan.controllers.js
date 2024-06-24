const User = require("../Model/user.model");
const File = require("../Model/file.model")
const Plan = require("../Model/plan.model")

const createPlan = async (req, res) => {
try {
        const validValue = req?.Validity ? req.Validity : 1;
        const filevalue   = req?.file ? req.file : 2;
        const dataValue  = req?.data ? req.data : 2;
        const rupees     =   req?.data ? req.data : 0;
        const newPlan = await Plan.create({
            validValue,
            filevalue ,
            dataValue,
            rupees    
        })
    
        if (!newPlan) res.status(400).json({ message: "Internal issue" });
    
        res
          .status(200)
          .json({ newPlan, message: "successfully created new plan" });
} catch (error) {
    console.log("createPlan", error);
}
}

const updatePlan = async (req, res) => {

}

const deletePlan = async (req, res) => {

}

const fetchAllPlans = async( req, res) => {

}

module.exports = {
    createPlan,
    updatePlan,
    deletePlan,
    fetchAllPlans
}