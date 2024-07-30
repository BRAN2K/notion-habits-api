import { Router } from "express";
import { routes } from "../config/routeConfig";
import { query } from "express-validator";
import {
  markHabitAsDone,
  getHabitQrCodes,
} from "../controllers/habitController";

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
  routes.habit.apiRoute,
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
router.get(routes.habits.apiRoute, getAllHabits);

/**
 * @swagger
 * /qrcode:
 *   get:
 *     summary: Generate QR code(s) for marking a habit or all habits as done
 *     description: Generates QR code(s) that link to the URL for marking the specified or all habits as done. The QR codes will be returned as downloadable images.
 *     parameters:
 *       - in: query
 *         name: habitName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the habit for which to generate the QR code, or "all" to generate QR codes for all habits.
 *     responses:
 *       200:
 *         description: QR code(s) generated successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get(
  routes.qrcode.apiRoute,
  [
    query("habitName")
      .isString()
      .notEmpty()
      .withMessage("habitName is required and must be a string"),
  ],
  getHabitQrCodes
);

export default router;
