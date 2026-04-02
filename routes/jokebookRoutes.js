"use strict";

const express = require("express");
const router = express.Router();
const controller = require ("../controllers/jokebookController");

router.get("/categories", controller.getCategories);
router.get("/category/:category", controller.getJokesByCategory);
router.get("/random", controller.getRandomJoke);
router.post("/joke/add", controller.addJoke);

module.exports = router;