const {Router} = require('express')
const {register, login, updatePlan, fetchPlan, updateUser} = require('../controllers/user.controller')
const router = Router();


router.post('/register', register)

router.post('/', login)
router.post('/updatePlan', updatePlan)
router.post('/fetchPlan', fetchPlan)
router.post('/updateUser', updateUser)


module.exports = router