"use strict";

const DatabaseService = require("./services/dbService.js");
const {Character} = require("./services/ramApiService.js");

/**
 * Fetches all characters from the API and stores them in the database.
 *
 * @param {DatabaseService} dbService - An instance of DatabaseService
 *  to interact with the database.
 * @throws {Error} If dbService is not an instance of DatabaseService.
 */
async function fetchAndStoreAllCharacters(dbService) {
  if (!(dbService instanceof DatabaseService)) {
    throw new Error(
      "Invalid parameter: dbService must be an instance of DatabaseService."
    );
  }

  let totalCharacters = 0;
  let storedCharacters = 0;
  const initialPage = 1;
  let page = initialPage;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const response = await Character.getPage(page);
      const characters = response.results;

      if (page === initialPage) {
        totalCharacters = response.info.count;
        console.log("Total characters count:", totalCharacters);
      }

      const insertPromises = characters.map(
        character => dbService.insertData(character.name, character)
      );
      await Promise.all(insertPromises);

      hasNextPage = response.info.next !== null;
      storedCharacters += characters.length;
      page++;
    } catch (err) {
      console.error(
        `Error fetching or storing characters on page ${page}:`,
        err,
      );
      hasNextPage = false;
    }
  }
  console.log("Total: ", totalCharacters, " Stored: ", storedCharacters);
}

/**
 * Main function to initialize the database and fetch/store character data.
 *
 * @async
 * @function main
 * @returns {Promise<void>}
 */
(async () => {
  const dbService = new DatabaseService();
  try {
    await dbService.initialize();
    await dbService.checkVersion();
    // await dbService.createTable();
    // await dbService.checkDataCount();
    // await fetchAndStoreAllCharacters(dbService);
    await dbService.checkDataCount();
    // await dbService.clearTable();
  } catch (err) {
    console.error("Error during database operations:", err);
  } finally {
    await dbService.close();
  }
})();
