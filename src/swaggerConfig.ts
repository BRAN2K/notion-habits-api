import swaggerJsdoc from "swagger-jsdoc";

// Define a documentação Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Habit API",
    version: "1.0.0",
    description: "API for managing daily habits",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
};

// Configurações do Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Caminho para os arquivos de rota com comentários Swagger
};

// Cria a especificação Swagger
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
