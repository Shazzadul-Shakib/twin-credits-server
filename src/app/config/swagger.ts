import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

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
        url: "http://localhost:5000/api",
        description: "Development server",
      },
      {
        url: "https://twin-credits-server.vercel.app/api",
        description: "Production server",
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
  // Paths to files where Swagger will look for documentation comments
  apis: [
    "./src/app/modules/**/*.ts",
    "./src/app/routes/*.ts",
    "./dist/app/modules/**/*.js",
    "./dist/app/routes/*.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
