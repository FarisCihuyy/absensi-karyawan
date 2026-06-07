const { Pool } = require("pg");
require("dotenv").config();

const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;
const HOST = process.env.PGHOST;
const PORT = process.env.PGPORT;
const DATABASE = process.env.PGDATABASE;

const pool = new Pool({
  user: USER || "postgres",
  password: PASSWORD || "postgres",
  host: HOST || "localhost",
  port: PORT || 5432,
  database: DATABASE || "postgres",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
