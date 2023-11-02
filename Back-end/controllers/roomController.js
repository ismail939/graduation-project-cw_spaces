const { Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => { 
            const rooms = await Room.findAll()
            if (rooms.length === 0) {
                const error = appError.create("Rooms not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: rooms }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const room = await Room.findAll({
                where: {
                    ID: req.params.ID
                }
            })
            if (room.length === 0) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: room }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newRoom = await Room.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newRoom });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedRoom = await Room.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (updatedRoom.length === 0) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Room.update(req.body, {
                where: {
                    ID: req.params.ID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedRoom = await Room.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (deletedRoom.length === 0) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Room.destroy({
                where: {
                    ID: req.params.ID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 