// mainfolder/swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job API",
      version: "1.0.0",
      description: "API for user authentication and job management",
    },
    servers: [
      {
        url: "https://node-express-backend-sdnp.onrender.com/api/v1",
        description: "Production server (Render)",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development server",
      },
    ],    
    // servers: [
    //   {
    //     url: "http://localhost:3000/api/v1", // change if your base URL is different
    //   },
    // ],
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
  apis: ["./routes/*.js", "./models/*.js"], // Scan these files for Swagger comments
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;