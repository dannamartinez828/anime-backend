require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

// Función reutilizable de búsqueda
async function buscarPersonaje(anime, nombre, id) {
  let whereExtra = "";
  let params = [anime];

  if (nombre) {
    whereExtra = "AND LOWER(p.nombre) LIKE LOWER($2)";
    params.push(`%${nombre}%`);
  } else if (id) {
    whereExtra = "AND p.id = $2";
    params.push(id);
  }

  const result = await pool.query(`
    SELECT
      p.id, p.nombre, p.edad, p.raza, p.poder,
      p.descripcion, p.categoria,
      a.nombre AS anime,
      json_agg(i.url ORDER BY i.id) AS imagenes
    FROM personajes p
    JOIN animes a ON p.anime_id = a.id
    LEFT JOIN imagenes i ON i.personaje_id = p.id
    WHERE LOWER(a.nombre) = $1 ${whereExtra}
    GROUP BY p.id, a.nombre
    ORDER BY p.id
  `, params);

  return result.rows;
}

// Health check
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", mensaje: "API funcionando ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Todos los personajes de un anime
app.get("/:anime/personajes", async (req, res) => {
  try {
    const rows = await buscarPersonaje(req.params.anime);
    res.json({ personajes: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar por nombre
app.get("/:anime/personajes/buscar", async (req, res) => {
  const { nombre } = req.query;
  if (!nombre?.trim()) return res.status(400).json({ error: "Falta el parámetro 'nombre'" });
  try {
    const rows = await buscarPersonaje(req.params.anime, nombre.trim());
    if (!rows.length) return res.status(404).json({ error: `No se encontró "${nombre}"` });
    res.json({ personaje: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar por ID
app.get("/:anime/personajes/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un número" });
  try {
    const rows = await buscarPersonaje(req.params.anime, null, id);
    if (!rows.length) return res.status(404).json({ error: `ID ${id} no encontrado` });
    res.json({ personaje: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  pool.query("SELECT NOW()")
    .then(r => console.log(`✅ DB conectada — ${r.rows[0].now}`))
    .catch(e => console.error("❌ Error:", e.message));
});