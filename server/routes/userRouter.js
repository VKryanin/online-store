const Router = require('express')
const router = new Router;
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/userinfo', UserController.getUser)
router.get('/auth',authMiddleware, UserController.check)
router.post('/update', UserController.updateUser)

module.exports = router
