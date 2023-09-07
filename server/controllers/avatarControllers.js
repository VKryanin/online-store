const { Avatar } = require("../models/models");
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const { log } = require("console");

class AvatarController {
    async createAvatar(req, res, next) {
        try {
            const { id, userId } = req.body;
            const isAvatar = await Avatar.findOne({ where: { userId } });
            if (!!isAvatar) {
                const { img } = req.files;
                let fileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                await Avatar.update({ img: fileName }, { where: { userId } });
                const avatar = await Avatar.findOne({ where: { userId } });
                return res.json(avatar);
            } else {
                const { img } = req.files;
                let fileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                const avatar = await Avatar.create({ id, userId, img: fileName });
                return res.json(avatar);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAvatar(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const { id } = jwt.decode(token, process.env.SECRET_KEY)
            const avatar = await Avatar.findOne({ where: { userId: id } })
            return res.json(avatar)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AvatarController();