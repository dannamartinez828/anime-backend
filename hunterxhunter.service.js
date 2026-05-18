const pool = require("./db");

async function buscarHunter(nombre) {

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

    WHERE LOWER(a.nombre) = 'hunterxhunter'

    AND LOWER(p.nombre)
    LIKE LOWER($1)

    GROUP BY p.id, a.nombre

    ORDER BY p.id
    `,
    [`%${nombre}%`]
  );

  return result.rows;
}

module.exports = {
  buscarHunter,
};