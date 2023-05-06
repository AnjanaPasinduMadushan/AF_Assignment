//this route file is created to check whether function is working as expected
const emailController = require("../controllers/email-controller")
const router = require("express").Router();

router.post('/sendEmail', emailController.sendVerificationEmail)
router.get("/", emailController.pingEmailServer);


module.exports = router;