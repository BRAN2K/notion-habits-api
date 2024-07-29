import express from "express";
import bodyParser from "body-parser";
import habitRoutes from "./routes/habitRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register routes under the "/api" prefix
app.use("/api", habitRoutes);

// Adiciona Swagger UI ao caminho '/api-docs'
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
