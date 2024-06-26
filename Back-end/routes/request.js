const express = require('express')
const requestController = require('../controllers/requestController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const { requestSchema } = require("../middlewares/validationSchema");

const router = express.Router();

router.route("/")
    .get(requestController.getAll) // for admin
    .post(verifyToken, allowedTo('client'), requestSchema(), requestController.create);

router.route("/:cwSpaceID")
    .get(verifyToken, allowedTo('owner', 'moderator'), requestController.getCw_spaceRequests)

router.route("/:clientID/:roomID")
    .patch(verifyToken, allowedTo('owner', 'moderator'), requestController.update)
    .delete(verifyToken, allowedTo('owner', 'moderator'), requestController.delete);

module.exports = router

