require("dotenv").config();

const { Pool } = require("pg");

const isProduction =
  process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL conectado");
  })
  .catch((err) => {
    console.log("❌ Error PostgreSQL");
    console.log(err.message);
  });

module.exports = pool;