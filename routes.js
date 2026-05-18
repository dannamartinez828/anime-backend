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

// ======================================
// HEALTH CHECK
// ======================================

router.get("/", (req, res) => {

  res.json({
    status: "ok",
    message: "Anime API funcionando 🚀",
  });

});

// =====================================================
// SAINT SEIYA
// =====================================================

// TODOS

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

// BUSCAR POR NOMBRE

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

// POR ID

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

// TODOS

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

// BUSCAR

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

// POR ID

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

// TODOS

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

// BUSCAR

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

// POR ID

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