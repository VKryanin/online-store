const Router = require('express')
const router = new Router;
const devicecontrollers = require('../controllers/deviceController');

router.post('/', devicecontrollers.create);
router.get('/', devicecontrollers.getAll);
router.get('/:id', devicecontrollers.getOne);


module.exports = router
