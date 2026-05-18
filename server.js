require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi =
  require("swagger-ui-express");

const swaggerJsdoc =
  require("swagger-jsdoc");

const routes = require("./routes");

const app = express();

const PORT =
  process.env.PORT || 3000;

// ======================================
// MIDDLEWARES
// ======================================

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.set("trust proxy", 1);

// ======================================
// SWAGGER
// ======================================

const swaggerOptions = {

  definition: {

    openapi: "3.0.0",

    info: {
      title: "Anime Microservices API",
      version: "1.0.0",
      description:
        "API Anime usando Express + PostgreSQL + Railway",
    },

    servers: [
      {
        url:
          process.env.RAILWAY_STATIC_URL
            ? `https://${process.env.RAILWAY_STATIC_URL}`
            : `http://localhost:${PORT}`,
      },
    ],
  },

  apis: ["./routes.js"],
};

const swaggerSpec =
  swaggerJsdoc(swaggerOptions);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

// ======================================
// ROUTES
// ======================================

app.use(routes);

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
    `🚀 Servidor corriendo en puerto ${PORT}`
  );

  console.log(
    `📘 Swagger Docs: /docs`
  );

});