const express = require("express");

const router = express.Router();

const authService =
  require("./auth.service");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 */
router.post(
  "/register",
  async (req, res) => {
    try {

      const {
        nombre,
        email,
        password
      } = req.body;

      const usuario =
        await authService.register(
          nombre,
          email,
          password
        );

      res.json(usuario);

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }
  }
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
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