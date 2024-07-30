import { Request } from "express";

export const routes = {
  habit: {
    apiRoute: "/habit",
    externalUrl: (req: Request, habitName: string) =>
      constructUrl(req, `/api/habit?habitName=${habitName}`),
  },
  habits: {
    apiRoute: "/habits",
    externalUrl: (req: Request) => constructUrl(req, `/api/habits`),
  },
  qrcode: {
    apiRoute: "/qrcode",
    externalUrl: (req: Request, habitName: string) =>
      constructUrl(req, `/api/qrcode?habitName=${habitName}`),
  },
};

// Função interna para construção de URLs externas
function constructUrl(req: Request, path: string): string {
  return `${req.protocol}://${req.get("host")}${path}`;
}
