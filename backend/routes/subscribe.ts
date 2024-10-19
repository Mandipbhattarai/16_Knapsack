import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const subscribeRouter = express.Router();
const prisma = new PrismaClient();

export interface ISUBSCRIBE {
  id: string;
  email: string;
}

subscribeRouter.post("/", async (req: Request, res: Response) => {
  const { email }: ISUBSCRIBE = req.body;
  try {
    const newSubscription = await prisma.subscribe.create({
      data: { email },
    });
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all subscriptions
subscribeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.subscribe.findMany();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default subscribeRouter;
