const { Rating, Device, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

class RatingController {
    async addRating(req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        const userId = jwt.decode(token, process.env.SECRET_KEY).id
        const { deviceId, rate } = req.body;
        if (0 <= rate && rate <= 5) {
            try {
                const existingRating = await Rating.findAll({
                    where: { deviceId, userId }
                });
                if (existingRating.length) {
                    await Rating.update({
                        rate: rate,
                    }, { where: { userId, deviceId } });
                } else {
                    await Rating.create({
                        rate: rate,
                        userId: userId,
                        deviceId: deviceId
                    });
                }
                const allRatings = await Rating.findAll({
                    where: { deviceId },
                    attributes: ["rate"],
                });
                const ratingList = allRatings.map(({ dataValues }) => dataValues)
                const middleRait = (ratingList.reduce((accumulator, { rate }) => accumulator + rate, 0) / ratingList.length).toFixed(1)

                const rating = await Device.update({
                    rating: middleRait,
                }, { where: { id: deviceId } });

                return res.json(rating);
            } catch (e) {
                next(ApiError.badRequest(e.message));
            }
        } else {
            next(ApiError.badRequest('mamu sosi'));
        }
    }
}

module.exports = new RatingController();