const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function initDB() {
  const db = await open({
    filename: "./team.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      available INTEGER NOT NULL
    )
  `);

  const existing = await db.get(
    "SELECT COUNT(*) as count FROM team_members"
  );

  if (existing.count === 0) {
    await db.run(
      `
      INSERT INTO team_members
      (name, role, available)
      VALUES
      ('Alex Rivers', 'Senior Developer', 1),
      ('Samantha Chen', 'UX Designer', 0),
      ('Jordan Taylor', 'Project Manager', 1),
      ('Emma Wilson', 'Frontend Developer', 1),
      ('Michael Brown', 'Backend Developer', 0),
      ('Olivia Davis', 'QA Engineer', 1)
      `
    );
  }

  return db;
}

module.exports = initDB;