const express = require('express')
const moderatorController = require('../controllers/moderatorController')
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const upload = require('../index')
const { moderatorSchema, moderatorPasswordSchema } = require("../middlewares/validationSchema");


router.route("/register")
    .post(moderatorSchema(), moderatorController.register);

router.route("/login")
    .post(moderatorController.login);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('moderator'), upload.single('profilePic'), moderatorController.updatePhoto);

router.route("/updatePassword/:ID")
    .patch(verifyToken, allowedTo('moderator'), moderatorPasswordSchema(), moderatorController.updatePassword);

router.route("/:ID")
    .delete(verifyToken, allowedTo('admin','owner'), moderatorController.delete);

router.route("/")
    .get(verifyToken, allowedTo('admin', 'owner'), moderatorController.getAll) 

module.exports = router