"use strict";
const pool = require("../dbConnection");

async function getCategories() {
    const result = await pool.query("SELECT DISTINCT category FROM jokes");
    return result.rows.map(row => row.category);
}

async function getJokesByCategory(category, limit) {
    let query = "SELECT * FROM jokes WHERE category = $1";
    const values = [category];

    if (limit) {
        query += " LIMIT $2";
        values.push(limit);
    }

    const result = await pool.query(query, values);
    return result.rows;
}

async function getRandomJoke() {
    const result = await pool.query("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1");
    return result.rows[0];
}

async function addJoke(category, setup, delivery) {
    const result = await pool.query(
        "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *",
        [category, setup, delivery]
    );
    return result.rows[0];
}

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};