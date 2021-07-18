'use strict'

const routeMovies = require('./movies');

const api = app => {
    routeMovies(app)
}

module.exports = api