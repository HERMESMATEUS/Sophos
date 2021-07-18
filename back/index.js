'use strict'

const express = require('express');
const mongoose = require("mongoose");

const settings = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }

const port = 3001;
const app = express();
const api = require('./controllers/index');

var cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

api(app);

mongoose.connect("mongodb://localhost:27017/movies", settings, (error, response) => {

    if (error) return console.log("Error de conexion base de datos ", error)
    console.log("Conexion exitosa")

    const server = app.listen(port, (error) => {

        if (error) return console.log(`Error: ${error}`);
        console.log(`Server listening on port ${server.address().port}`);

    });

})
