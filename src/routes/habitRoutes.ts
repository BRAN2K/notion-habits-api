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

export default router;
