const express = require("express");

const {
  buscarSaintSeiya,
  obtenerSaintSeiyaPorId,
  obtenerTodosSaintSeiya,
} = require("./saintseiya.service");

const {
  buscarHunter,
  obtenerHunterPorId,
  obtenerTodosHunter,
} = require("./hunterxhunter.service");

const {
  buscarOnePiece,
  obtenerOnePiecePorId,
  obtenerTodosOnePiece,
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

// =====================================================
// SAINT SEIYA
// =====================================================

/**
 * @swagger
 * /saintseiya/personajes:
 *   get:
 *     summary: Obtener todos los personajes Saint Seiya
 *     tags:
 *       - Saint Seiya
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get(
  "/saintseiya/personajes",
  async (req, res) => {
    try {

      const rows =
        await obtenerTodosSaintSeiya();

      res.json({
        total: rows.length,
        personajes: rows,
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
 *         example: Seiya
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
 * /saintseiya/personajes/{id}:
 *   get:
 *     summary: Obtener personaje Saint Seiya por ID
 *     tags:
 *       - Saint Seiya
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */
router.get(
  "/saintseiya/personajes/:id",
  async (req, res) => {
    try {

      const { id } = req.params;

      const personaje =
        await obtenerSaintSeiyaPorId(id);

      if (!personaje) {
        return res.status(404).json({
          error: "Personaje no encontrado",
        });
      }

      res.json(personaje);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// =====================================================
// HUNTER X HUNTER
// =====================================================

/**
 * @swagger
 * /hunterxhunter/personajes:
 *   get:
 *     summary: Obtener todos los personajes Hunter x Hunter
 *     tags:
 *       - Hunter x Hunter
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get(
  "/hunterxhunter/personajes",
  async (req, res) => {
    try {

      const rows =
        await obtenerTodosHunter();

      res.json({
        total: rows.length,
        personajes: rows,
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
 *         example: Kurapika
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
 * /hunterxhunter/personajes/{id}:
 *   get:
 *     summary: Obtener personaje Hunter x Hunter por ID
 *     tags:
 *       - Hunter x Hunter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 13
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */
router.get(
  "/hunterxhunter/personajes/:id",
  async (req, res) => {
    try {

      const { id } = req.params;

      const personaje =
        await obtenerHunterPorId(id);

      if (!personaje) {
        return res.status(404).json({
          error: "Personaje no encontrado",
        });
      }

      res.json(personaje);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// =====================================================
// ONE PIECE
// =====================================================

/**
 * @swagger
 * /onepiece/personajes:
 *   get:
 *     summary: Obtener todos los personajes One Piece
 *     tags:
 *       - One Piece
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get(
  "/onepiece/personajes",
  async (req, res) => {
    try {

      const rows =
        await obtenerTodosOnePiece();

      res.json({
        total: rows.length,
        personajes: rows,
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
 *         example: Luffy
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

/**
 * @swagger
 * /onepiece/personajes/{id}:
 *   get:
 *     summary: Obtener personaje One Piece por ID
 *     tags:
 *       - One Piece
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 26
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */
router.get(
  "/onepiece/personajes/:id",
  async (req, res) => {
    try {

      const { id } = req.params;

      const personaje =
        await obtenerOnePiecePorId(id);

      if (!personaje) {
        return res.status(404).json({
          error: "Personaje no encontrado",
        });
      }

      res.json(personaje);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

module.exports = router;