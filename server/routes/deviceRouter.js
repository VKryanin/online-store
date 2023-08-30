const Router = require('express')
const router = new Router;
const devicecontrollers = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), devicecontrollers.create);
router.get('/', devicecontrollers.getAll);
router.get('/:id', devicecontrollers.getOne);


module.exports = router
