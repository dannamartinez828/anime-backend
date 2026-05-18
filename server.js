require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi =
  require("swagger-ui-express");

const swaggerJsdoc =
  require("swagger-jsdoc");

const routes =
  require("./routes");

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

// ======================================
// SWAGGER
// ======================================

const options = {

  definition: {

    openapi: "3.0.0",

    info: {

      title:
        "Anime API",

      version:
        "1.0.0",

      description:
        "API de animes con auth y personajes",

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

  apis: [

    "./routes.js",
    "./auth.routes.js",

  ],

};

const specs =
  swaggerJsdoc(options);

app.use(
  "/docs",

  swaggerUi.serve,

  swaggerUi.setup(specs)
);

// ======================================
// ROUTES
// ======================================

app.use(routes);

app.use("/auth", authRoutes);

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