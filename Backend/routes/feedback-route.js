const express = require("express");
const router = express.Router();
const feedbackController= require("../controllers/feedbackContoller");
const middleware = require("../middlewares/user-middleware")


router.post("/addfeedback/:complaintId" , middleware.checkToken, middleware.citizenRole, feedbackController.addFeedback );
router.get("/getOwnFeeds", middleware.checkToken, middleware.citizenRole, feedbackController.getByUserID)
router.get("/getAll", middleware.checkToken, middleware.AdminRole, feedbackController.getAllFeedback );
router.get("/getId/:id", middleware.checkToken, middleware.citizenRole, feedbackController.getByID);
router.put("/update/:id",feedbackController.updateFeedback);

module.exports = router;