import express from "express";
import bodyParser from "body-parser";
import habitRoutes from "./routes/habitRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register routes under the "/api" prefix
app.use("/api", habitRoutes);

export default app;
