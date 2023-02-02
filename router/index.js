const Router = require("express").Router;
const router = new Router();
const authController = require("../controller/authController");
const balanceController = require("../controller/balanceController");
const checkToken = require("../middleware/authMiddleware");

router.post("/registration", authController.registration);
router.post("/login", checkToken, authController.login);
router.get("/activate/:link", authController.activate);
router.put("/balance", checkToken, balanceController.createBalance);

module.exports = router;
