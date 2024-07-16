"use strict";

const axios = require("axios");

const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = `${baseURL}character/`;
const locationURL = `${baseURL}location/`;
const episodeURL = `${baseURL}episode/`;

/**
 * Base class for general API information and schema retrieval.
 */
class Base {
    /**
     * Fetches general API information.
     * @returns {Promise<Object>} The API information.
     */
    static async apiInfo() {
        const response = await axios.get(baseURL);
        return response.data;
    }

    /**
     * Fetches the schema of the character endpoint.
     * @returns {Promise<Array<string>>} The schema keys.
     */
    static async schema() {
        const response = await axios.get(characterURL);
        return Object.keys(response.data.info);
    }
}

/**
 * Character class for interacting with the character endpoint.
 */
class Character {
    /**
     * Fetches all characters.
     * @returns {Promise<Object>} The list of all characters.
     */
    static async getAll() {
        const response = await axios.get(characterURL);
        return response.data;
    }

    /**
     * Fetches characters by page number.
     * @param {number} number - The page number.
     * @returns {Promise<Object>} The list of characters on the specified page.
     */
    static async getPage(number) {
        const response = await axios.get(`${characterURL}?page=${number}`);
        return response.data;
    }

    /**
     * Fetches a character by ID.
     * @param {number} id - The character ID.
     * @returns {Promise<Object>} The character data.
     */
    static async get(id) {
        if (!id) {
            console.error("You need to pass id of character to get output.");
            console.error(
                "To get list of all characters, use getAll() method.",
            );
            return;
        }
        const response = await axios.get(`${characterURL}${id}`);
        return response.data;
    }

    /**
     * Filters characters based on query parameters.
     * @param {Object} params - The query parameters.
     * @returns {Promise<Object>} The filtered list of characters.
     */
    static async filter(params) {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${characterURL}?${query}`);
        return response.data;
    }

    /**
     * Fetches the schema of the character endpoint.
     * @returns {Promise<Array<string>>} The schema keys.
     */
    static async schema() {
        const response = await axios.get(characterURL);
        return Object.keys(response.data.results[0]);
    }
}

/**
 * Location class for interacting with the location endpoint.
 */
class Location {
    /**
     * Fetches all locations.
     * @returns {Promise<Object>} The list of all locations.
     */
    static async getAll() {
        const response = await axios.get(locationURL);
        return response.data;
    }

    /**
     * Fetches a location by ID.
     * @param {number} id - The location ID.
     * @returns {Promise<Object>} The location data.
     */
    static async get(id) {
        if (!id) {
            console.error("You need to pass id of location to get output.");
            console.error("To get list of all locations, use getAll() method.");
            return;
        }
        const response = await axios.get(`${locationURL}${id}`);
        return response.data;
    }

    /**
     * Filters locations based on query parameters.
     * @param {Object} params - The query parameters.
     * @returns {Promise<Object>} The filtered list of locations.
     */
    static async filter(params) {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${locationURL}?${query}`);
        return response.data;
    }

    /**
     * Fetches the schema of the location endpoint.
     * @returns {Promise<Array<string>>} The schema keys.
     */
    static async schema() {
        const response = await axios.get(locationURL);
        return Object.keys(response.data.results[0]);
    }
}

/**
 * Episode class for interacting with the episode endpoint.
 */
class Episode {
    /**
     * Fetches all episodes.
     * @returns {Promise<Object>} The list of all episodes.
     */
    static async getAll() {
        const response = await axios.get(episodeURL);
        return response.data;
    }

    /**
     * Fetches an episode by ID.
     * @param {number} id - The episode ID.
     * @returns {Promise<Object>} The episode data.
     */
    static async get(id) {
        if (!id) {
            console.error("You need to pass id of episode to get output.");
            console.error("To get list of all episodes, use getAll() method.");
            return;
        }
        const response = await axios.get(`${episodeURL}${id}`);
        return response.data;
    }

    /**
     * Filters episodes based on query parameters.
     * @param {Object} params - The query parameters.
     * @returns {Promise<Object>} The filtered list of episodes.
     */
    static async filter(params) {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${episodeURL}?${query}`);
        return response.data;
    }

    /**
     * Fetches the schema of the episode endpoint.
     * @returns {Promise<Array<string>>} The schema keys.
     */
    static async schema() {
        const response = await axios.get(episodeURL);
        return Object.keys(response.data.results[0]);
    }
}

module.exports = { Base, Character, Location, Episode };
