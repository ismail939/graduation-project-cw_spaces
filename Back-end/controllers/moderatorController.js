const Sequelize = require('sequelize');
const { Moderator } = require('../models/modelIndex');
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/generateJWT");
const { uploadToCloud, deleteFromCloud } = require('../utils/cloudinary');
const { validationResult } = require("express-validator");

module.exports = {
    register: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            const duplicates = await Moderator.findOne({
                raw: true, where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username }
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Moderator Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
            const newModerator = await Moderator.create({
                username: req.body.username,
                password: hashedPassword,
                cwSpaceCwID: req.body.cwSpaceCwID
            })
            if (newModerator) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Moderator is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
            return next(error)
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const moderator = await Moderator.findOne({
                raw: true, where: {
                    username: req.body.username
                }
            })
            if (moderator) {
                const enteredPassword = req.body.password;
                bcrypt.compare(enteredPassword, moderator.password, async (err, result) => {
                    if (result) {
                        delete moderator.password
                        const token = await generateJWT(moderator, process.env.ACCESS_TOKEN_PERIOD)
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, data: { token } })
                    }
                    const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                    return next(error)
                });
            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const moderators = await Moderator.findAll()
            if (moderators.length != 0) {
                return res.json({ status: httpStatusCode.SUCCESS, data: moderators })
            }
            const error = appError.create("There Are NO Available Moderators", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    updatePhoto: asyncWrapper(
        async (req, res, next) => {
            let updatedModerator = await Moderator.findOne({
                raw: true, where: {
                    moderatorID: req.params.ID
                }
            })
            if (updatedModerator) {
                if(updatedModerator.imgName){
                    await deleteFromCloud(('moderators/'+updatedModerator.imgName))
                }
                await uploadToCloud(req, 'moderators') 
                await Moderator.update(req.body, {
                where: {
                    moderatorID: req.params.ID
                }
                })
                if (updatedModerator.imgName) {
                    await deleteFromCloud(('moderators/'+updatedModerator.imgName))
                }
                updatedModerator = await Moderator.findOne({
                    raw: true, where: {
                        moderatorID: req.params.ID
                    }
                });
                delete updatedModerator.password;
                const token = await generateJWT(updatedModerator, process.env.ACCESS_TOKEN_PERIOD);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Moderator Updated Successfully", data: { token } });
            }
            const error = appError.create("Moderator Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    updatePassword: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            let updatedModerator = await Moderator.findOne({
                raw: true, where: {
                    moderatorID: req.params.ID
                }
            })
            if (updatedModerator) {
                const oldPassword = req.body.oldPassword; 
                bcrypt.compare(oldPassword, updatedModerator.password, async (err, result) => {
                    if (result) {
                        const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                        await Moderator.update(
                            { password: hashedPassword }, {
                            where: {
                                moderatorID: req.params.ID
                            }
                        }
                        )
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Password is Updated Successfully!"})
                    }
                    else {
                        const error = appError.create("Old Password is Incorrect ", 404, httpStatusCode.ERROR);
                        return next(error);
                    }
                });
            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedModerator = await Moderator.findOne({
                where: {
                    moderatorID: req.params.ID
                }
            });
            if (deletedModerator) {
                await Moderator.destroy({
                    where: {
                        moderatorID: req.params.ID
                    }
                })
                if (deletedModerator.imgName) {
                    await deleteFromCloud(('moderators/'+deletedModerator.imgName))
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Moderator Deleted Successfully" })     
            }
            const error = appError.create("Moderator Not Found", 404, httpStatusCode.ERROR)
            return next(error);
        }
    )
} 