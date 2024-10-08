const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
}
