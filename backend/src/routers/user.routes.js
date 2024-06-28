const {Router} = require('express')
const {register, changeisActivate, login, addPlan, fetchPurchashedPlans, fetchPlan, updateUser} = require('../controllers/user.controller')
const router = Router();


router.post('/register', register)

router.post('/', login)
router.post('/addPlan', addPlan)
router.get('/fetchPlan', fetchPlan)
router.post('/updateUser', updateUser)
router.post('/fetchPurchashedPlans', fetchPurchashedPlans)
router.post('/changeisActivate', changeisActivate)


module.exports = router