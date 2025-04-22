import { Request, Response } from "express";
import router from "../configs/expressClient";
import prisma from "../configs/prismaClient";
import { User } from "@prisma/client";

router.get("/", async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany();

  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  const input = req.body;

  const user: User = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
    },
  });

  res.json(user);
});

export default router;
