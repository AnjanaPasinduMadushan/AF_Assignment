const router = require("express").Router();
const complaintsController = require("../controllers/complaintControllers");
const middlware = require("../middlewares/user-middleware")


router.get("/complaints", middlware.checkToken, complaintsController.fetchComplaints);
router.get("/currentComplaints", middlware.checkToken, complaintsController.getCurrentComplaints);
router.get("/complaints/:id", middlware.checkToken, complaintsController.fetchComplaint);
router.get("/getOwnComplaints", middlware.checkToken, middlware.citizenRole, complaintsController.getByUserID);
router.post("/complaints", middlware.checkToken, middlware.citizenRole, complaintsController.createComplaint);
router.put("/complaints/:id", middlware.checkToken, middlware.citizenRole, complaintsController.updateComplaint);
router.delete("/complaints/:id", middlware.checkToken, middlware.citizenRole, complaintsController.deleteComplaint);
router.get("/getNewComplaints", middlware.checkToken, middlware.AdminRole, complaintsController.getNewComplaints)
router.patch("/verifyComplaint/:id", middlware.checkToken, middlware.AdminRole, complaintsController.verifyComplaint)
router.delete("/unverifyComplaint/:id", middlware.checkToken, middlware.AdminRole, complaintsController.unverifyComplaint)
router.patch("/updateStatus/:id", middlware.checkToken, middlware.AdminRole, complaintsController.updateStatus)

module.exports = router;