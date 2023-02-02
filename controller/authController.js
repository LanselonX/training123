const authService = require("../services/authService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await authService.registration(email, password);
      res.cookie("refresh_token", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
