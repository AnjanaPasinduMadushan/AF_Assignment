const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/addComment", commentController.addComment);
router.get("/:id", commentController.readSingleComment);
router.get("/complaint/:complaintId", commentController.getByComplaint);
router.get("/user/:userId", commentController.getByUser);
router.patch("/update/:commentId", commentController.updateComment);
router.delete("/delete/:commentId", commentController.deleteComment);


module.exports = router;