import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  getTodayPage,
  createTodayPage,
  updateHabit,
} from "../services/notionService";

/**
 * Marks a habit as completed in Notion for the current day.
 * @param req - Express request object containing the habitName query parameter.
 * @param res - Express response object to send the response to the client.
 */
export const markHabitAsDone = async (req: Request, res: Response) => {
  // Validate the request parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const habitName = req.query.habitName as string;

  try {
    // Attempt to get the Notion page for today
    let todayPage = await getTodayPage();

    // If the page for today does not exist, create a new one
    if (!todayPage) {
      todayPage = await createTodayPage();
    }

    // Check if the habit has already been marked as completed
    const habitStatus = todayPage.properties[habitName]?.checkbox;
    if (habitStatus) {
      return res
        .status(200)
        .json({ message: `Habit ${habitName} already marked as done.` });
    }

    // Mark the habit as completed
    await updateHabit(todayPage.id, habitName);
    res.status(200).json({ message: `Habit ${habitName} marked as done.` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while marking the habit as done." });
  }
};
