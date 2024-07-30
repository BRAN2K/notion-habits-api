import axios from "axios";
import dotenv from "dotenv";
import { notionFields } from "../config/notionFields";

dotenv.config();

// Notion API configurations
const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

const notion = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${notionToken}`,
    "Notion-Version": "2021-05-13",
  },
});

/**
 * Formats the date as "Day, dd/mm/yyyy" without the "-feira" suffix and with the first letter of the weekday capitalized.
 * @param date - Date to be formatted.
 * @returns Formatted date as a string.
 */
const formatDate = (date: Date) => {
  // Function to capitalize the first letter of the string and make the rest lowercase.
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Formatting options for the date.
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  };

  // Format the date and remove the "-feira" suffix from the weekday.
  return capitalizeFirstLetter(
    new Intl.DateTimeFormat("pt-BR", options).format(date).replace("-feira", "")
  );
};

/**
 * Retrieves the Notion page corresponding to today's date.
 * @returns The Notion page for today, if it exists.
 */
export const getTodayPage = async () => {
  const today = new Date().toISOString().split("T")[0];
  const response = await notion.post(`/databases/${databaseId}/query`, {
    filter: {
      property: notionFields.date,
      date: {
        equals: today,
      },
    },
  });

  return response.data.results[0];
};

/**
 * Creates a new page in Notion for the current day.
 * @returns The page created in Notion.
 */
export const createTodayPage = async () => {
  const today = new Date();
  const formattedDate = formatDate(today);

  const response = await notion.post("/pages", {
    parent: { database_id: databaseId },
    properties: {
      [notionFields.date]: {
        date: {
          start: today.toISOString().split("T")[0],
        },
      },
      [notionFields.title]: {
        title: [
          {
            text: {
              content: formattedDate,
            },
          },
        ],
      },
    },
  });

  return response.data;
};

/**
 * Updates the status of a habit on a specific page.
 * @param pageId - ID of the page where the habit will be updated.
 * @param habitName - Name of the habit to be marked as completed.
 * @returns The response of the page update.
 */
export const updateHabit = async (pageId: string, habitName: string) => {
  const response = await notion.patch(`/pages/${pageId}`, {
    properties: {
      [habitName]: {
        checkbox: true,
      },
    },
  });

  return response.data;
};

/**
 * Retrieves all checkbox properties (habits) from the Notion database.
 * @returns A list of checkbox properties.
 */
export const getAllHabitsFromDatabase = async () => {
  const response = await notion.get(`/databases/${databaseId}`);

  const properties = response.data.properties;
  const checkBoxProperties = [];

  for (const prop in properties) {
    if (properties[prop].type === "checkbox") {
      checkBoxProperties.push(prop);
    }
  }

  return checkBoxProperties;
};
