const db = require("./db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// ==========================================
// REGISTER
// ==========================================

async function register(
    nombre,
    email,
    password
) {

    const existe = await db.query(
        `
        SELECT * FROM usuarios
        WHERE email = $1
        `,
        [email]
    );

    if (existe.rows.length > 0) {
        throw new Error("El usuario ya existe");
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const result = await db.query(
        `
        INSERT INTO usuarios
        (
            nombre,
            email,
            password
        )
        VALUES ($1, $2, $3)

        RETURNING
        id,
        nombre,
        email
        `,
        [
            nombre,
            email,
            hashedPassword
        ]
    );

    return result.rows[0];
}

// ==========================================
// LOGIN
// ==========================================

async function login(
    email,
    password
) {

    const result = await db.query(
        `
        SELECT * FROM usuarios
        WHERE email = $1
        `,
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("Usuario no encontrado");
    }

    const usuario = result.rows[0];

    const validPassword =
        await bcrypt.compare(
            password,
            usuario.password
        );

    if (!validPassword) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {

        token,

        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    };
}

module.exports = {
    register,
    login
};