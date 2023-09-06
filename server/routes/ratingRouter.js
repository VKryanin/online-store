const Router = require('express')
const router = new Router;
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.addRating);

module.exports = router