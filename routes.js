const express = require("express");

const {
  obtenerTodosSaintSeiya,
  buscarSaintSeiya,
  obtenerSaintSeiyaPorId,
} = require("./saintseiya.service");

const {
  obtenerTodosHunter,
  buscarHunter,
  obtenerHunterPorId,
} = require("./hunterxhunter.service");

const {
  obtenerTodosOnePiece,
  buscarOnePiece,
  obtenerOnePiecePorId,
} = require("./onepiece.service");

const router = express.Router();

// ======================================
// HEALTH
// ======================================

router.get("/", (req, res) => {

  res.json({
    status: "ok",
    message: "Anime API funcionando 🚀",
  });

});

// ======================================
// SAINT SEIYA
// ======================================

router.get(
  "/saintseiya/personajes",
  async (req, res) => {

    const rows =
      await obtenerTodosSaintSeiya();

    res.json(rows);

  }
);

router.get(
  "/saintseiya/personajes/buscar",
  async (req, res) => {

    const rows =
      await buscarSaintSeiya(
        req.query.nombre
      );

    res.json(rows);

  }
);

router.get(
  "/saintseiya/personajes/:id",
  async (req, res) => {

    const personaje =
      await obtenerSaintSeiyaPorId(
        req.params.id
      );

    res.json(personaje);

  }
);

// ======================================
// HUNTER
// ======================================

router.get(
  "/hunterxhunter/personajes",
  async (req, res) => {

    const rows =
      await obtenerTodosHunter();

    res.json(rows);

  }
);

router.get(
  "/hunterxhunter/personajes/buscar",
  async (req, res) => {

    const rows =
      await buscarHunter(
        req.query.nombre
      );

    res.json(rows);

  }
);

router.get(
  "/hunterxhunter/personajes/:id",
  async (req, res) => {

    const personaje =
      await obtenerHunterPorId(
        req.params.id
      );

    res.json(personaje);

  }
);

// ======================================
// ONE PIECE
// ======================================

router.get(
  "/onepiece/personajes",
  async (req, res) => {

    const rows =
      await obtenerTodosOnePiece();

    res.json(rows);

  }
);

router.get(
  "/onepiece/personajes/buscar",
  async (req, res) => {

    const rows =
      await buscarOnePiece(
        req.query.nombre
      );

    res.json(rows);

  }
);

router.get(
  "/onepiece/personajes/:id",
  async (req, res) => {

    const personaje =
      await obtenerOnePiecePorId(
        req.params.id
      );

    res.json(personaje);

  }
);

module.exports = router;