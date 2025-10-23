import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const fileExtension = process.env.NODE_ENV === "production" ? "js" : "ts";
const baseDir = process.env.NODE_ENV === "production" ? "./dist" : "./src";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Twin Credits API Documentation",
      version: "1.0.0",
      description: "API documentation for Twin Credits server",
    },
    servers: [
      {
        url: "/api",
        description: "API Server",
      },
    ],
  },
  apis: [
    `${baseDir}/app/modules/**/*.${fileExtension}`,
    `${baseDir}/app/routes/*.${fileExtension}`,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  // Serve Swagger UI at /api-docs
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );

  // Serve raw JSON at /swagger.json
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
