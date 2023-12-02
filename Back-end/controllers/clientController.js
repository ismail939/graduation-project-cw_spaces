const Sequelize = require('sequelize');
const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser } = require("../middlewares/validationSchema");


module.exports ={
    getAll: asyncWrapper(
        async (req, res, next) => {
            const clients = await Client.findAll()
            if (clients.length === 0) {
                const error = appError.create("There Are No Available Clients", 404, httpStatusCode.ERROR)
                return next(error)
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: clients })
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    username: req.params.username
                }
            })
            if (client) {
                return res.json({ status: httpStatusCode.SUCCESS, data: client })
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findAll({
                raw: true, where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            if (client) {
                return res.json({ status: httpStatusCode.SUCCESS, data: client })
            }
            const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUser(req);
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const duplicates = await Client.findOne({
                raw: true, where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Duplicate Data Not Allowed", 400, httpStatusCode.ERROR)
                return next(error)
            }
            
            const newClient = await Client.create(req.body)
            if(newClient){
                return res.json({ status: httpStatusCode.SUCCESS, message: "Client is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedClient = await Client.findOne({
                where: {
                    username: req.params.username
                }
            });
            if (updatedClient) {
                await Client.update(req.body, {
                    where: {
                        username: req.params.username
                    }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
                return next(error);
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedClient = await Client.findOne({
                where: {
                    username: req.params.username
                }
            });
            if (deletedClient) {
                await Client.destroy({
                    where: {
                        username: req.params.username
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
                return next(error);
        }
    )
}