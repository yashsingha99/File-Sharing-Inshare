const express = require("express");
const Router = express.Router();

const { createPlan, updatePlan, deletePlan, fetchAllPlans, fetchActivatedPlan } = require('../controllers/plan.controllers')

Router.post('/', createPlan)
Router.patch('/updatePlan', updatePlan)
Router.delete('/deletePlan', deletePlan)
Router.get('/fetchAllPlans', fetchAllPlans)
Router.get('/fetchActivatedPlan', fetchActivatedPlan)

module.exports = Router;