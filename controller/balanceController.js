const balanceService = require("../services/balanceService");

class BalanceController {
  async createBalance(req, res, next) {
    try {
      const { email, amount } = req.body;
      balanceService.createBalance(email, amount);
      res.status(200).json({ message: "Balance update successfully" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BalanceController();
