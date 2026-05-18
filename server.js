require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi =
  require("swagger-ui-express");

const swaggerJsdoc =
  require("swagger-jsdoc");

const routes = require("./routes");

const authRoutes =
  require("./auth.routes");

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
// RUTAS AUTH
// ======================================

app.use("/auth", authRoutes);

// ======================================
// SWAGGER
// ======================================

const swaggerOptions = {

  definition: {

    openapi: "3.0.0",

    info: {

      title: "Anime Microservices API",

      version: "2.0.0",

      description:
        "API Anime usando Express + PostgreSQL + Railway + Login JWT",

    },

    servers: [
      {
        url:
          process.env.RAILWAY_STATIC_URL
            ? `https://${process.env.RAILWAY_STATIC_URL}`
            : `http://localhost:${PORT}`,
      },
    ],

    components: {

      securitySchemes: {

        bearerAuth: {

          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",

        },

      },

    },

    security: [
      {
        bearerAuth: [],
      },
    ],

  },

  apis: [
    "./routes.js",
    "./auth.routes.js",
  ],

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
// RUTAS API
// ======================================

app.use(routes);

// ======================================
// HOME
// ======================================

app.get("/", (req, res) => {

  res.json({

    mensaje:
      "🚀 Anime API funcionando correctamente",

    swagger:
      "/docs",

    auth: {

      register:
        "/auth/register",

      login:
        "/auth/login",

    },

  });

});

// ======================================
// 404
// ======================================

app.use((req, res) => {

  res.status(404).json({

    error:
      "Ruta no encontrada",

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
    `📘 Swagger Docs: http://localhost:${PORT}/docs`
  );

});