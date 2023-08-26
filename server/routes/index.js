const Router = require('express')
const router = new Router;

const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const checkRole = require('../middleware/checkRoleMiddleware')

router.use('/user', userRouter);
router.use('/type', checkRole('ADMIN'), typeRouter);
router.use('/brand', checkRole('ADMIN'), brandRouter);
router.use('/device', checkRole('ADMIN'), deviceRouter);

module.exports = router
