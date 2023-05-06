const router = require("express").Router();
const complaintsController = require("../controllers/complaintControllers");

router.get("/complaints", complaintsController.fetchComplaints);
router.get("/complaints/:id", complaintsController.fetchComplaint);
router.post("/complaints", complaintsController.createComplaint);
router.put("/complaints/:id", complaintsController.updateComplaint);
router.delete("/complaints/:id", complaintsController.deleteComplaint);

module.exports = router;