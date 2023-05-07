const router = require("express").Router();
const complaintsController = require("../controllers/complaintControllers");
const middlware = require("../middlewares/user-middleware")


router.get("/complaints", middlware.checkToken, complaintsController.fetchComplaints);
router.get("/complaints/:id", complaintsController.fetchComplaint);
router.get("/getOwnComplaints", middlware.checkToken, middlware.citizenRole, complaintsController.getByUserID);
router.post("/complaints", middlware.checkToken, middlware.citizenRole, complaintsController.createComplaint);
router.put("/complaints/:id", complaintsController.updateComplaint);
router.delete("/complaints/:id", complaintsController.deleteComplaint);
router.get("/getNewComplaints", middlware.checkToken, middlware.AdminRole, complaintsController.getNewComplaints)
router.get("/verifyComplaint/:id", middlware.checkToken, middlware.AdminRole, complaintsController.verifyComplaint)
router.delete("/unverifyComplaint/:id", middlware.checkToken, middlware.AdminRole, complaintsController.unverifyComplaint)

module.exports = router;