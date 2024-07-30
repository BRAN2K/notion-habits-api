import { Router } from "express";
import { query } from "express-validator";
import { markHabitAsDone } from "../controllers/habitController";

const router = Router();

/**
 * @swagger
 * /habit:
 *   get:
 *     summary: Mark a habit as done
 *     description: Marks a specified habit as done for the current day.
 *     parameters:
 *       - in: query
 *         name: habitName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the habit to mark as done.
 *     responses:
 *       200:
 *         description: Habit marked as done successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Habit <habitName> marked as done.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
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

import { getAllHabits } from "../controllers/habitController";

/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Retrieve all habit checkbox properties
 *     description: Retrieves all checkbox properties from the Notion database.
 *     responses:
 *       200:
 *         description: List of habit checkbox properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 habits:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Exercise", "Read", "Meditate"]
 *       500:
 *         description: Internal server error
 */
router.get("/habits", getAllHabits);

export default router;
