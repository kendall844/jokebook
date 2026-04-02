"use strict";
const model = require("../models/jokebookModel");

const getCategories = async (req, res) => {
    try {
        const data = await model.getCategories();
        res.json(data.map(c => c.name));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getJokesByCategory = async (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit;

    try {
        const jokes = await model.getJokesByCategory(category, limit);

        if (jokes.length === 0) {
            return res.status(404).json({ error: "Invalid Category" });
        }
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
    const {category, setup, delivery} = req.body;
    if (!category || !setup || !delivery){
        return res.status(400).json({error: "Missing Field(s)"});
    }

    try{
        const jokes = await model.addJoke(category, setup, delivery);
        res.json(jokes);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};