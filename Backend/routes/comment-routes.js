const router = require("express").Router();
const commentController = require("../controllers/commentController");
const middleware = require("../middlewares/user-middleware");

router.post("/addComment", middleware.checkToken, middleware.citizenRole, commentController.addComment);
router.get("/:id", commentController.readSingleComment);
router.get("/complaint/:complaintId", commentController.getByComplaint);
router.get("/user/:userId", commentController.getByUser);
router.patch("/update/:commentId", middleware.checkToken, middleware.citizenRole, commentController.updateComment);
router.delete("/delete/:commentId", commentController.deleteComment);


module.exports = router;