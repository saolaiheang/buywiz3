import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,   
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: parseInt(DB_PORT || "5432")
});
export default pool;
