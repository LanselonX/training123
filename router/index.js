const Router = require("express").Router;
const router = new Router();
const authController = require("../controller/authController");
const balanceController = require("../controller/balanceController");

router.post("/registration", authController.registration);
router.get("/activate/:link", authController.activate);
router.put("/balance", balanceController.createBalance);

module.exports = router;
