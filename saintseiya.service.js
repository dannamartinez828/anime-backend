const pool = require("./db");

// ======================================
// TODOS
// ======================================

async function obtenerTodosSaintSeiya() {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 1
    ORDER BY id
    `
  );

  return result.rows;

}

// ======================================
// BUSCAR
// ======================================

async function buscarSaintSeiya(nombre) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 1
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

async function obtenerSaintSeiyaPorId(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 1
    AND id = $1
    `,
    [id]
  );

  return result.rows[0];

}

module.exports = {

  obtenerTodosSaintSeiya,

  buscarSaintSeiya,

  obtenerSaintSeiyaPorId,

};