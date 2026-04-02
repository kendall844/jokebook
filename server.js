"use strict";
const express = require("express");
const app = express();

require("dotenv").config();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const jokebookRoutes = require('./routes/jokebookRoutes');

app.use('/api/jokebook', jokebookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});