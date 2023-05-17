const router = require("express").Router();
const voteController = require("../controllers/voteController");
const middleware = require("../middlewares/user-middleware")

router.post("/add", middleware.checkToken, middleware.citizenRole, voteController.vote);

module.exports = router;