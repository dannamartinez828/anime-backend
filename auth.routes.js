const express = require("express");

const router = express.Router();

const authService =
  require("./auth.service");

// ======================================
// REGISTER
// ======================================

router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        nombre,
        email,
        password
      } = req.body;

      const data =
        await authService.register(
          nombre,
          email,
          password
        );

      res.json(data);

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }

  }
);

// ======================================
// LOGIN
// ======================================

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const data =
        await authService.login(
          email,
          password
        );

      res.json(data);

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }

  }
);

module.exports = router;