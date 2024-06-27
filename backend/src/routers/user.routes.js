const {Router} = require('express')
const {register, login, addPlan, fetchPurchashedPlans, fetchPlan, updateUser} = require('../controllers/user.controller')
const router = Router();


router.post('/register', register)

router.post('/', login)
router.post('/addPlan', addPlan)
router.get('/fetchPlan', fetchPlan)
router.post('/updateUser', updateUser)
router.post('/fetchPurchashedPlans', fetchPurchashedPlans)


module.exports = router