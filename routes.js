const express = require("express");

const {
  buscarSaintSeiya,
} = require("./saintseiya.service");

const {
  buscarHunter,
} = require("./hunterxhunter.service");

const {
  buscarOnePiece,
} = require("./onepiece.service");

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health Check API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API funcionando
 */

router.get("/", (req, res) => {

  res.json({
    status: "ok",
    message: "Anime API funcionando 🚀",
  });

});

/**
 * @swagger
 * /saintseiya/personajes/buscar:
 *   get:
 *     summary: Buscar personaje Saint Seiya
 *     tags:
 *       - Saint Seiya
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         example: seiya
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */

router.get(
  "/saintseiya/personajes/buscar",
  async (req, res) => {

    try {

      const { nombre } = req.query;

      const rows =
        await buscarSaintSeiya(nombre);

      if (!rows.length) {

        return res.status(404).json({
          error: "Personaje no encontrado",
        });

      }

      res.json({
        total: rows.length,
        personaje: rows[0],
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }

  }
);

/**
 * @swagger
 * /hunterxhunter/personajes/buscar:
 *   get:
 *     summary: Buscar personaje Hunter x Hunter
 *     tags:
 *       - Hunter x Hunter
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         example: gon
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */

router.get(
  "/hunterxhunter/personajes/buscar",
  async (req, res) => {

    try {

      const { nombre } = req.query;

      const rows =
        await buscarHunter(nombre);

      if (!rows.length) {

        return res.status(404).json({
          error: "Personaje no encontrado",
        });

      }

      res.json({
        total: rows.length,
        personaje: rows[0],
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }

  }
);

/**
 * @swagger
 * /onepiece/personajes/buscar:
 *   get:
 *     summary: Buscar personaje One Piece
 *     tags:
 *       - One Piece
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         example: luffy
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */

router.get(
  "/onepiece/personajes/buscar",
  async (req, res) => {

    try {

      const { nombre } = req.query;

      const rows =
        await buscarOnePiece(nombre);

      if (!rows.length) {

        return res.status(404).json({
          error: "Personaje no encontrado",
        });

      }

      res.json({
        total: rows.length,
        personaje: rows[0],
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }

  }
);

module.exports = router;