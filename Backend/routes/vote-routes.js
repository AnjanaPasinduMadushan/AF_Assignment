const router = require("express").Router();
const voteController = require("../controllers/voteController");
const middleware = require("../middlewares/user-middleware")

router.post("/add", middleware.checkToken, middleware.citizenRole, voteController.vote);
router.get("/checkVote/:complaintId", middleware.checkToken, middleware.citizenRole, voteController.checkVote);

module.exports = router;