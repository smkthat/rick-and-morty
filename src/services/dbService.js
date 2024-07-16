"use strict";

const fs = require("fs");
const {Client} = require("pg");
require("../config");

/**
 * DatabaseService class provides methods to interact with a PostgreSQL database.
 */
class DatabaseService {
  /**
   * Constructs a new DatabaseService instance.
   * Initializes the database configuration and client.
   */
  constructor() {
    this.config = {
      connectionString: `postgres://` +
        `${process.env.DB_USER}:${process.env.DB_PASS}@` +
        `${process.env.DB_HOST}:${process.env.DB_PORT}/` +
        `${process.env.DB_NAME}`,
      ssl: {
        rejectUnauthorized: true,
        ca: fs
          .readFileSync("/home/runner/.postgresql/root.crt")
          .toString(),
      },
    };
    this.client = new Client(this.config);
  }

  /**
   * Initializes the database connection.
   * @throws Will throw an error if the connection fails.
   */
  async initialize() {
    try {
      await this.client.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Connection error:", err);
      throw err;
    }
  }

  /**
   * Checks and logs the PostgreSQL version.
   * @throws Will throw an error if the query fails.
   */
  async checkVersion() {
    try {
      const res = await this.client.query("SELECT version()");
      console.log("PostgreSQL version:", res.rows[0]);
    } catch (err) {
      console.error("Error checking version:", err);
      throw err;
    }
  }

  /**
   * Creates a table if it does not already exist.
   * @throws Will throw an error if the query fails.
   */
  async createTable() {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public.smkthat (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL DEFAULT '',
                data JSONB
            );
        `;
    try {
      await this.client.query(createTableQuery);
      console.log("Table already exist or created successfully");
    } catch (err) {
      console.error("Error creating table:", err);
      throw err;
    }
  }

  javascript

  /**
   * Inserts data into the table.
   *
   * @param {string} name - The name to insert.
   * @param {object} data - The JSON data to insert.
   * @throws Will throw an error if the query fails
   *    or if the input data types are invalid.
   */
  async insertData(name, data) {
    if (typeof name !== 'string' || typeof data !== 'object') {
      throw new Error('Invalid input data types');
    }

    const insertQuery = `
            INSERT INTO public.smkthat (name, data)
            VALUES ($1, $2)
            RETURNING *;
        `;
    try {
      const res = await this.client.query(insertQuery, [name, data]);
      // console.log("Data inserted successfully:", res.rows[0]);
    } catch (err) {
      console.error("Error inserting data:", err);
      throw err;
    }
  }

  /**
   * Checks and logs the count of rows in the table.
   * @throws Will throw an error if the query fails.
   */
  async checkDataCount() {
    const selectQuery = `
            SELECT COUNT(id) FROM public.smkthat;
        `;
    try {
      const res = await this.client.query(selectQuery);
      console.debug("Data retrieved successfully:", res.rows[0]);
    } catch (err) {
      console.error("Error retrieving data:", err);
      throw err;
    }
  }

  /**
   * Retrieves data by ID from the table.
   * @param {number} id - The ID of the row to retrieve.
   * @throws Will throw an error if the query fails.
   */
  async getDataById(id) {
    const selectQuery = `
            SELECT id, name, data FROM public.smkthat WHERE id = $1;
        `;
    try {
      const res = await this.client.query(selectQuery, [id]);
      console.debug("Data retrieved successfully:", res.rows[0]);
    } catch (err) {
      console.error("Error retrieving data:", err);
      throw err;
    }
  }

  /**
   * Clears all data from the table.
   * @throws Will throw an error if the query fails.
   */
  async clearTable() {
    const clearTableQuery = `
            DELETE FROM public.smkthat;
        `;
    try {
      await this.client.query(clearTableQuery);
      console.debug("Table cleared successfully");
    } catch (err) {
      console.error("Error clearing table:", err);
      throw err;
    }
  }

  /**
   * Closes the database connection.
   * @throws Will throw an error if the connection fails to close.
   */
  async close() {
    try {
      await this.client.end();
      console.log("Connection closed");
    } catch (err) {
      console.error("Error closing connection:", err);
      throw err;
    }
  }
}

module.exports = DatabaseService;
