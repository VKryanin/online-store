const Router = require('express')
const router = new Router;
const checkRole = require('../middleware/checkRoleMiddleware');
const avatarControllers = require('../controllers/avatarControllers');

router.post('/', avatarControllers.createAvatar);
router.get('/', avatarControllers.getAvatar);

module.exports = router