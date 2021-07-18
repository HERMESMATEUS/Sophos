'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MoviesSchema = Schema({
    "title": String,
    "year": Number,
    "type": String,
    "likes": Number
})

module.exports = mongoose.model("movies", MoviesSchema)