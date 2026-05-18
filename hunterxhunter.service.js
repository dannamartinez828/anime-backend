const pool = require("./db");

// ======================================
// TODOS
// ======================================

async function obtenerTodosHunter() {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 2
    ORDER BY id
    `
  );

  return result.rows;

}

// ======================================
// BUSCAR
// ======================================

async function buscarHunter(nombre) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 2
    AND LOWER(nombre)
    LIKE LOWER($1)
    `,
    [`%${nombre}%`]
  );

  return result.rows;

}

// ======================================
// POR ID
// ======================================

async function obtenerHunterPorId(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 2
    AND id = $1
    `,
    [id]
  );

  return result.rows[0];

}

module.exports = {

  obtenerTodosHunter,

  buscarHunter,

  obtenerHunterPorId,

};