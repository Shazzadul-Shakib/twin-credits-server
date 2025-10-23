import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

// Determine file extension based on environment
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
    tags: [
      {
        name: "User",
        description: "User management",
      },
      {
        name: "Referral",
        description: "Referral management",
      },
      {
        name: "Product",
        description: "Product management",
      },
      {
        name: "Order",
        description: "Order management",
      },
    ],
  },
  apis: [
    `${baseDir}/app/modules/**/*.${fileExtension}`,
    `${baseDir}/app/routes/*.${fileExtension}`,
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  // Option 1: Use serveFiles option (recommended)
  const options = {
    explorer: true,
    swaggerOptions: {
      url: "/api-docs/swagger.json",
    },
  };

  app.get("/api-docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerSpec, options),
    swaggerUi.setup(swaggerSpec, options)
  );
};
