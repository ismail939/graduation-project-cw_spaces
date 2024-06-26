const express = require('express')
const bookController = require('../controllers/bookController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const { bookSchema } = require("../middlewares/validationSchema");
const router = express.Router();

router.route("/roomof/:roomID")
    .post(bookController.getAllBookingsOneRoom)

router.route("/")
    .get(bookController.get) // must set to the admin
    .post(verifyToken, allowedTo('client'), bookSchema(), bookController.create);

router.route("/:cwSpaceCwID")
    .get(verifyToken, allowedTo('owner', 'moderator'), bookController.getCwSpaceBookings)

router.route("/:bookID")
    .delete(verifyToken, allowedTo('client'), bookController.delete)     

router.route("/:clientID/:roomID")
    .get(verifyToken, allowedTo('client'), bookController.getOne)
    .patch(verifyToken, allowedTo('client'), bookController.update)



module.exports = router