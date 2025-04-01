import { Request, Response } from 'express';
import router from '../configs/expressClient';

// mock data
const rooms = [
  {
    id: "1001",
    date: "2022-01-15T13:16:43.252Z",
    chargeNurse: "nurse",
    goalsForToday: "",
    precaution: "",
    specialNeeds: "",
    comment: "",
    questionAskDoctor: "",
  },
];

router.get("/", (req: Request, res: Response) => {
  res.json(rooms);
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const result = rooms.find((product) => product.id === id);
  res.json(result);
});

router.post("/", (req: Request, res: Response) => {
  const payload = req.body;
  res.json(payload);
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  res.json(payload);
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id });
});

export default router
