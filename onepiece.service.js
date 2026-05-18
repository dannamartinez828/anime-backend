const pool = require("./db");

async function buscarSaintSeiya(nombre) {

  const query = `
    SELECT
      p.id,
      p.nombre,
      p.edad,
      p.raza,
      p.poder,
      p.descripcion,
      p.categoria,

      COALESCE(
        json_agg(
          json_build_object(
            'id', i.id,
            'url', i.url,
            'descripcion', i.descripcion
          )
        ) FILTER (WHERE i.id IS NOT NULL),
        '[]'
      ) AS imagenes

    FROM personajes p

    LEFT JOIN imagenes i
      ON i.personaje_id = p.id

    WHERE p.anime_id = 1
      AND LOWER(p.nombre)
      LIKE LOWER($1)

    GROUP BY p.id
  `;

  const values = [`%${nombre}%`];

  const { rows } =
    await pool.query(query, values);

  return rows;
}

async function obtenerTodosSaintSeiya() {

  const query = `
    SELECT
      p.id,
      p.nombre,
      p.edad,
      p.raza,
      p.poder,
      p.descripcion,
      p.categoria,

      COALESCE(
        json_agg(
          json_build_object(
            'id', i.id,
            'url', i.url,
            'descripcion', i.descripcion
          )
        ) FILTER (WHERE i.id IS NOT NULL),
        '[]'
      ) AS imagenes

    FROM personajes p

    LEFT JOIN imagenes i
      ON i.personaje_id = p.id

    WHERE p.anime_id = 3

    GROUP BY p.id
  `;

  const { rows } =
    await pool.query(query);

  return rows;
}

async function obtenerSaintSeiyaPorId(id) {

  const query = `
    SELECT
      p.id,
      p.nombre,
      p.edad,
      p.raza,
      p.poder,
      p.descripcion,
      p.categoria,

      COALESCE(
        json_agg(
          json_build_object(
            'id', i.id,
            'url', i.url,
            'descripcion', i.descripcion
          )
        ) FILTER (WHERE i.id IS NOT NULL),
        '[]'
      ) AS imagenes

    FROM personajes p

    LEFT JOIN imagenes i
      ON i.personaje_id = p.id

    WHERE p.id = $1

    GROUP BY p.id
  `;

  const { rows } =
    await pool.query(query, [id]);

  return rows[0];
}

module.exports = {
  buscarSaintSeiya,
  obtenerTodosSaintSeiya,
  obtenerSaintSeiyaPorId,
};