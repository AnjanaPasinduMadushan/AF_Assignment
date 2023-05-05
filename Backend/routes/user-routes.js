const userController = require("../controllers/user-controller");

const middlware = require("../middlewares/user-middleware") 
const router = require("express").Router();

//anyone can access, no need to check token
router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
// //admin can only access
router.get("/newUsers", middlware.checkToken, middlware.AdminRole,  userController.getNewUsers);
router.get("/oldUsers", middlware.checkToken, middlware.AdminRole, userController.getOldUsers);

// //anyone can access
router.get("/profile", middlware.checkToken, userController.getOwnAcc);
router.post("/logout", middlware.checkToken, userController.logout);
router.delete("/UnverifyUser/:id",  userController.unverifiedUser)
router.patch("/verifyUser/:id", userController.updateCheckingIn)
router.delete("/deleteAcc", middlware.checkToken, userController.deleteAcc)
router.patch("/updateProfile", middlware.checkToken, userController.updateAcc)
// router.patch("/update/pwd", requireAuth, updatePassword)


module.exports = router;