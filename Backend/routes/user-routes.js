const userController = require("../controllers/user-controller");

const middlware = require("../middlewares/user-middleware") 
const router = require("express").Router();

//anyone can access, no need to check token
router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
// //admin can only access
// router.get("/users", requireAuth, requireRoleAdmin, getUsers);

// //anyone can access
router.get("/profile", middlware.checkToken, userController.getOwnAcc);
// router.post("/logout", requireAuth, logout);
router.delete("/UnverifyUser/:id", middlware.checkToken, middlware.AdminRole, userController.unverifiedUser)
router.patch("/verifyUser/:id", middlware.checkToken, middlware.AdminRole, userController.updateCheckingIn)
router.delete("/deleteAcc", middlware.checkToken, userController.deleteAcc)
router.patch("/updateProfile", middlware.checkToken, userController.updateAcc)
// router.patch("/update/pwd", requireAuth, updatePassword)


module.exports = router;