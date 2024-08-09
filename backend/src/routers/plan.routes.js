const express = require("express");
const Router = express.Router();

const { createPlan, updatePlan, deletePlan, fetchAllPlans } = require('../controllers/plan.controllers')

Router.post('/', createPlan)
Router.patch('/updatePlan', updatePlan)
Router.delete('/deletePlan', deletePlan)
Router.get('/fetchAllPlans', fetchAllPlans)

module.exports = Router;