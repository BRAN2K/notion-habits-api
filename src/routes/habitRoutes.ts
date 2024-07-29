import { Router } from "express";
import { query } from "express-validator";
import { markHabitAsDone } from "../controllers/habitController";

const router = Router();

// Route to mark a habit as done. Uses GET method and expects a query parameter habitName.
router.get(
  "/habit",
  [
    query("habitName")
      .isString()
      .notEmpty()
      .withMessage("habitName is required and must be a string"),
  ],
  markHabitAsDone
);

export default router;
