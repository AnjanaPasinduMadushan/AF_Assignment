const express = require("express");
const router = express.Router();
const feedbackController= require("../controllers/feedbackContoller");

router.post("/addfeedback" ,feedbackController.addFeedback );
router.get("/getAll",feedbackController.getAllFeedback );
router.get("/getByID/:id",feedbackController.getByID);
router.put("/update/:id",feedbackController.updateFeedback);

module.exports = router;