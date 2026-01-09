import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "hardware-shop.db");

const db = new Database(dbPath);

// Create tables if not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL,
    created_at TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    name TEXT,
    price REAL,
    quantity INTEGER
  )
`).run();

export default db;
