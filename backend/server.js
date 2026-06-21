const express = require("express");
const cors = require("cors");
const initDB = require("./database");
const app = express();

app.use(cors());
app.use(express.json());



app.get("/api/team", async (req, res) => {
  const db = await initDB();

  const members = await db.all(`
    SELECT
      id,
      name,
      role,
      available
    FROM team_members
  `);

  const formatted = members.map((member) => ({
    ...member,
    available: Boolean(member.available),
  }));

  res.json(formatted);
});
app.patch("/api/team/:id", async (req, res) => {
  const db = await initDB();

  const id = Number(req.params.id);
  const { available } = req.body;

  await db.run(
    `
    UPDATE team_members
    SET available = ?
    WHERE id = ?
    `,
    [available ? 1 : 0, id]
  );

  const updatedMember = await db.get(
    `
    SELECT *
    FROM team_members
    WHERE id = ?
    `,
    [id]
  );

  updatedMember.available =
    Boolean(updatedMember.available);

  res.json(updatedMember);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});