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
    ],
    tags: [
      {
        name: "Users",
        description: "User management",
      },
      {
        name: "Referrals",
        description: "Referral management",
      },
      {
        name: "Products",
        description: "Product management",
      },
    ],
  },
  // Paths to files where Swagger will look for documentation comments
  apis: ["./src/app/modules/**/*.ts", "./src/app/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
