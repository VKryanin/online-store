const uuid = require('uuid');
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError');
const { log } = require('console');

class DeviceController {
    async create(req, res, next) {
        console.log(req.body);
        try {
            const { name, price, brandId, typeId, info } = req.body;
            console.log(info);
            const { img } = req.files;
            console.log(img);
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })
            if (info) {
                console.log(info, 'info');
                const Info = JSON.parse(info)
                    Info.forEach(i =>
                        {console.log(device.id)
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        })}
                    );               
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        const { brandId, typeId, limit = 9, page = 1 } = req.query;
        let devices;
        let offset = page * limit - limit
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset, order: [["id", 'ASC']] })

        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()