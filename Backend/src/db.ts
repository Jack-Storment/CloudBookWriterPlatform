import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../db.json");

interface Data {
  users: Array<{ id: string; email: string; password: string; role: string }>;
  sections: Array<{
    id: string;
    name: string;
    subsections: Array<any>;
    userId: string;
  }>;
}

async function readDB(): Promise<Data> {
  const data = await fs.readFile(dbPath, "utf8");
  return JSON.parse(data) as Data;
}

async function writeDB(data: Data): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export { readDB, writeDB };
