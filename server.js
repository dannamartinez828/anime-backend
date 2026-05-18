require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const authRoutes =
  require("./auth.routes");

const app = express();

const PORT =
  process.env.PORT || 3000;

// ======================================
// MIDDLEWARES
// ======================================

app.use(cors());

app.use(express.json());

// ROUTES

app.use(routes);

app.use("/auth", authRoutes);

// ======================================
// HEALTH CHECK
// ======================================

app.get("/", (req, res) => {

  res.json({
    status: "ok",
    message: "API funcionando",
  });

});

// ======================================
// 404
// ======================================

app.use((req, res) => {

  res.status(404).json({
    error: "Ruta no encontrada",
  });

});

// ======================================
// SERVER
// ======================================

app.listen(PORT, () => {

  console.log(
    `🚀 Servidor corriendo en ${PORT}`
  );

});