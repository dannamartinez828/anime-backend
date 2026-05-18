const db = require("./db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// ======================================
// REGISTER
// ======================================

async function register(
  nombre,
  email,
  password
) {

  // verificar email

  const existe = await db.query(
    `
    SELECT *
    FROM usuarios
    WHERE email = $1
    `,
    [email]
  );

  if (existe.rows.length > 0) {

    throw new Error(
      "El email ya existe"
    );

  }

  // hash password

  const hashedPassword =
    await bcrypt.hash(password, 10);

  // insertar usuario

  const result = await db.query(
    `
    INSERT INTO usuarios
    (
      nombre,
      email,
      password
    )
    VALUES ($1, $2, $3)
    RETURNING id, nombre, email
    `,
    [
      nombre,
      email,
      hashedPassword
    ]
  );

  return {
    message:
      "Usuario registrado",
    usuario:
      result.rows[0],
  };

}

// ======================================
// LOGIN
// ======================================

async function login(
  email,
  password
) {

  const result = await db.query(
    `
    SELECT *
    FROM usuarios
    WHERE email = $1
    `,
    [email]
  );

  const usuario =
    result.rows[0];

  if (!usuario) {

    throw new Error(
      "Usuario no encontrado"
    );

  }

  // comparar password

  const valido =
    await bcrypt.compare(
      password,
      usuario.password
    );

  if (!valido) {

    throw new Error(
      "Contraseña incorrecta"
    );

  }

  // TOKEN JWT

  const token = jwt.sign(

    {
      id: usuario.id,
      email: usuario.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );

  return {

    message:
      "Login exitoso",

    token,

    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
    },
  };

}

module.exports = {
  register,
  login,
};