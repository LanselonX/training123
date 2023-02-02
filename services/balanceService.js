const UserModel = require("../models/userModel");
const ApiError = require("../exceptions/api.error");

class BalanceService {
  async checkBalance(balance) {
    if (balance <= 0) {
      throw ApiError.BadRequest(
        "Баланс не может быть отрицательным, либо равным нулю"
      );
    }
  }

  async createBalance(email, amount) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(
        "Пользователь с таким почтовым ящиком не найден"
      );
    }
    this.checkBalance(candidate.balance + amount);
    candidate.balance = parseInt(candidate.balance) + parseInt(amount);
    await candidate.save();
    console.log(`${UserModel.email}'s new balance is ${UserModel.balance} `);
  }
}

module.exports = new BalanceService();
