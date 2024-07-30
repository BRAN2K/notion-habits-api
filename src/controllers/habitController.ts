import { Request, Response } from "express";
import { routes } from "../config/routeConfig";
import {
  getTodayPage,
  createTodayPage,
  updateHabit,
  getAllHabitsFromDatabase,
} from "../services/notionService";

import { generateQrCode } from "../services/qrCodeService";
import archiver from "archiver";

/**
 * Marks a habit as completed in Notion for the current day.
 * @param req - Express request object containing the habitName query parameter.
 * @param res - Express response object to send the response to the client.
 */
export const markHabitAsDone = async (req: Request, res: Response) => {
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

/**
 * Gets all habit checkbox properties from the Notion database.
 * @param req - Express request object.
 * @param res - Express response object to send the response to the client.
 */
export const getAllHabits = async (req: Request, res: Response) => {
  try {
    const habits = await getAllHabitsFromDatabase();
    res.status(200).json({ habits });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving habits." });
  }
};

/**
 * Generates QR codes for the habit marking URLs.
 * If "all" is specified as the habitName, it generates QR codes for all habits.
 * @param req - Express request object containing the habitName query parameter.
 * @param res - Express response object to send the response to the client.
 */
export const getHabitQrCodes = async (req: Request, res: Response) => {
  const habitName = req.query.habitName as string;

  try {
    if (habitName === "all") {
      const habits = await getAllHabitsFromDatabase();
      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      // Stream the zip file to the response
      res.attachment("qrcodes.zip");
      archive.pipe(res);

      for (const habit of habits) {
        const url = routes.habit.externalUrl(req, habit);
        const qrCodeDataUrl = await generateQrCode(url);

        // Convert data URL to Buffer
        const base64Data = qrCodeDataUrl.split(",")[1];
        const imgBuffer = Buffer.from(base64Data, "base64");

        archive.append(imgBuffer, { name: `${habit}.png` });
      }

      archive.finalize();
    } else {
      const url = routes.habit.externalUrl(req, habitName);
      const qrCodeDataUrl = await generateQrCode(url);

      // Convert data URL to Buffer
      const base64Data = qrCodeDataUrl.split(",")[1];
      const imgBuffer = Buffer.from(base64Data, "base64");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${habitName}.png"`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imgBuffer);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the QR codes." });
  }
};
