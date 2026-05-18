const pool = require("./db");

// ======================================
// TODOS
// ======================================

async function obtenerTodosOnePiece() {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 3
    ORDER BY id
    `
  );

  return result.rows;

}

// ======================================
// BUSCAR
// ======================================

async function buscarOnePiece(nombre) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 3
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

async function obtenerOnePiecePorId(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM personajes
    WHERE anime_id = 3
    AND id = $1
    `,
    [id]
  );

  return result.rows[0];

}

module.exports = {

  obtenerTodosOnePiece,

  buscarOnePiece,

  obtenerOnePiecePorId,

};