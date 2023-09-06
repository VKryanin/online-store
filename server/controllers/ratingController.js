const { Rating, Device, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        const userId = jwt.decode(token, process.env.SECRET_KEY).id
        const { deviceId, rate } = req.body;
        try {
            const existingRating = await Rating.findOne({
                where: { deviceId, userId },
            });

            if (existingRating) {

                existingRating.rate = rate;
                await existingRating.save();
                return res.json(existingRating);
            }

            const rating = await Rating.create({
                deviceId,
                userId,
                rate,
            });

            const device = await Device.findByPk(deviceId);
            const existingRatings = await Rating.findAll({
                where: { deviceId },
            });

            let totalRate = 0;
            existingRatings.forEach((rating) => {
                totalRate += rating.rate;
            });

            device.rating = totalRate / existingRatings.length;
            await device.save();

            return res.json(rating);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RatingController();