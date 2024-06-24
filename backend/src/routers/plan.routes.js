const express = require("express");
const Router = express.Router();

const {  createPlan, updatePlan, deletePlan, fetchAllPlans} = require('../controllers/plan.controllers')

Router.post('/', createPlan)
Router.post('/updatePlan', updatePlan)
Router.post('/deletePlan', deletePlan)
Router.post('/fetchAllPlans', fetchAllPlans)

module.exports = Router;