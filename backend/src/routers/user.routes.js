const {Router} = require('express')
const {register, decreaseValidity, login, addPlan, fetchPlan, updateUser} = require('../controllers/user.controller')
const router = Router();


router.post('/register', register)

router.post('/', login)
router.post('/addPlan', addPlan)
router.post('/fetchPlan', fetchPlan)
router.post('/updateUser', updateUser)
router.post('/decreaseValidity', decreaseValidity)


module.exports = router