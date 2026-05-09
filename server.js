require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const PORT = process.env.PORT || 3000;

// ======================================
// DATABASE
// ======================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ======================================
// MIDDLEWARES
// ======================================

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.set("trust proxy", 1);

// ======================================
// SWAGGER CONFIG
// ======================================

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Anime Characters API",
      version: "1.0.0",
      description:
        "API de personajes anime usando Express + PostgreSQL + Railway",
    },

    servers: [
      {
        url:
          process.env.RAILWAY_STATIC_URL
            ? `https://${process.env.RAILWAY_STATIC_URL}`
            : `http://localhost:${PORT}`,
      },
    ],
  },

  apis: ["./server.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ======================================
// NORMALIZAR ANIMES
// ======================================

function normalizarAnime(anime) {
  anime = anime.toLowerCase().trim();

  const mapas = {
    saintseiya: "saint seiya",
    "saint-seiya": "saint seiya",

    hunterxhunter: "hunterxhunter",
    "hunter-x-hunter": "hunterxhunter",

    onepiece: "onepiece",
    "one-piece": "onepiece",
  };

  return mapas[anime] || anime;
}

// ======================================
// FUNCIÓN DE BÚSQUEDA
// ======================================

async function buscarPersonaje(anime, nombre, id) {

  anime = normalizarAnime(anime);

  let whereExtra = "";
  let params = [anime];

  if (nombre) {

    whereExtra = `
      AND LOWER(p.nombre)
      LIKE LOWER($2)
    `;

    params.push(`%${nombre}%`);

  } else if (id) {

    whereExtra = "AND p.id = $2";

    params.push(id);

  }

  const result = await pool.query(
    `
    SELECT
      p.id,
      p.nombre,
      p.edad,
      p.raza,
      p.poder,
      p.descripcion,
      p.categoria,

      a.nombre AS anime,

      COALESCE(
        json_agg(i.url ORDER BY i.id)
        FILTER (WHERE i.url IS NOT NULL),
        '[]'
      ) AS imagenes

    FROM personajes p

    JOIN animes a
      ON p.anime_id = a.id

    LEFT JOIN imagenes i
      ON i.personaje_id = p.id

    WHERE LOWER(a.nombre) = LOWER($1)
    ${whereExtra}

    GROUP BY p.id, a.nombre

    ORDER BY p.id
    `,
    params
  );

  return result.rows;
}

// ======================================
// HEALTH CHECK
// ======================================

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica si la API funciona
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API funcionando correctamente
 */

app.get("/", async (req, res) => {

  try {

    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      mensaje: "API funcionando ✅",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

// ======================================
// TODOS LOS PERSONAJES
// ======================================

/**
 * @swagger
 * /{anime}/personajes:
 *   get:
 *     summary: Obtiene todos los personajes de un anime
 *     tags:
 *       - Personajes
 *     parameters:
 *       - in: path
 *         name: anime
 *         required: true
 *         schema:
 *           type: string
 *         example: onepiece
 *     responses:
 *       200:
 *         description: Lista de personajes
 */

app.get("/:anime/personajes", async (req, res) => {

  try {

    const rows = await buscarPersonaje(
      req.params.anime
    );

    res.json({
      total: rows.length,
      personajes: rows,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

// ======================================
// BUSCAR PERSONAJE POR NOMBRE
// ======================================

/**
 * @swagger
 * /{anime}/personajes/buscar:
 *   get:
 *     summary: Buscar personaje por nombre
 *     tags:
 *       - Personajes
 *     parameters:
 *       - in: path
 *         name: anime
 *         required: true
 *         schema:
 *           type: string
 *         example: saintseiya
 *
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         example: Seiya
 *
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */

app.get("/:anime/personajes/buscar", async (req, res) => {

  const { nombre } = req.query;

  if (!nombre?.trim()) {

    return res.status(400).json({
      error: "Falta el parámetro 'nombre'",
    });

  }

  try {

    const rows = await buscarPersonaje(
      req.params.anime,
      nombre.trim()
    );

    if (!rows.length) {

      return res.status(404).json({
        error: `No se encontró "${nombre}"`,
      });

    }

    res.json({
      personaje: rows[0],
      totalImagenes: rows[0].imagenes.length,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

// ======================================
// BUSCAR PERSONAJE POR ID
// ======================================

/**
 * @swagger
 * /{anime}/personajes/{id}:
 *   get:
 *     summary: Buscar personaje por ID
 *     tags:
 *       - Personajes
 *     parameters:
 *       - in: path
 *         name: anime
 *         required: true
 *         schema:
 *           type: string
 *         example: onepiece
 *
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 21
 *
 *     responses:
 *       200:
 *         description: Personaje encontrado
 */

app.get("/:anime/personajes/:id", async (req, res) => {

  const { id } = req.params;

  if (isNaN(id)) {

    return res.status(400).json({
      error: "El ID debe ser un número",
    });

  }

  try {

    const rows = await buscarPersonaje(
      req.params.anime,
      null,
      id
    );

    if (!rows.length) {

      return res.status(404).json({
        error: `ID ${id} no encontrado`,
      });

    }

    res.json({
      personaje: rows[0],
      totalImagenes: rows[0].imagenes.length,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

// ======================================
// SERVER
// ======================================

app.listen(PORT, () => {

  console.log(
    `🚀 Servidor en puerto ${PORT}`
  );

  console.log(
    `📘 Swagger Docs: /docs`
  );

  pool.query("SELECT NOW()")
    .then((r) => {

      console.log(
        `✅ DB conectada — ${r.rows[0].now}`
      );

    })
    .catch((e) => {

      console.error(
        "❌ Error DB:",
        e.message
      );

    });

});