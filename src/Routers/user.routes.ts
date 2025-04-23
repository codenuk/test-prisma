import { Request, Response } from "express";
import router from "../configs/expressClient";
import prisma from "../configs/prismaClient";
import { User } from "../../prisma/generated";
import { v4 as uuidv4 } from 'uuid';

router.get("/", async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany();

  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  const input = req.body;

  const user: User = await prisma.user.create({
    data: {
      userID: uuidv4(),
      email: input.email,
      name: input.name,
      password: input.password,
    },
  });

  res.json(user);
});

export default router;
