const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.json(rooms);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = rooms.find((product) => product.id === id);
  res.json(result);
});

router.post("/", (req, res) => {
  const payload = req.body;
  res.json(payload);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  res.json(payload);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

module.exports = router;
