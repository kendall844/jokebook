"use strict";
const model = require("../models/jokebookModel");

const getCategories = async (req, res) => {
    try {
        const data = await model.getCategories();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getJokesByCategory = async (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

    try {
        const jokes = await model.getJokesByCategory(category, limit);
        if (jokes.length === 0) return res.status(404).json({ error: "No jokes found for this category" });
        res.json(jokes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRandomJoke = async (req, res) => {
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addJoke = async (req, res) => {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
        return res.status(400).json({ error: "Missing field(s). 'category', 'setup', and 'delivery' are required." });
    }

    try {
        await model.addJoke(category, setup, delivery);
        const jokes = await model.getJokesByCategory(category);
        res.json(jokes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};