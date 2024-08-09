const {Router} = require('express')
const router = Router();
const {register, changeisActivate, login, addPlan, fetchPurchashedPlans, fetchPlan, fetchActivatedBuyPlan} = require('../controllers/user.controller')


router.post('/register', register)

router.post('/', login)
router.post('/addPlan', addPlan)
router.get('/fetchPlan', fetchPlan)
router.post('/fetchPurchashedPlans', fetchPurchashedPlans)
router.post('/changeisActivate', changeisActivate)
router.post('/fetchActivatedBuyPlan', fetchActivatedBuyPlan)


module.exports = router