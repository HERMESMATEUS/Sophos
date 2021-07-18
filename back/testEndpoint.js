'use strict'

const fetch = require('node-fetch');
const dataMovies = require("./moviesAndSeries.json")

async function getMovies() {
    let response = await fetch("http://localhost:3001/movies");
    if (response.status == 200) return console.log("[getMovies]", await response.json())
    else console.log("[getMovies Error] ", await response.json())
}

async function getMovie(type) {
    let response = await fetch(`http://localhost:3001/movies/${type}`);
    if (response.status == 200) return console.log("[getMovies]", await response.json())
    else console.log("[getMovies Error] ", await response.json())
}


async function postMovie(item) {
    let response = await fetch(`http://localhost:3001/movies`, {
        method: 'post',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.status == 200) return console.log("[postMovie]", await response.json())
    else return console.log("[postMovie Error] ", await response.json())
}

function loadMoviesAndSeries() {
    dataMovies.map(async (item) => await postMovie(item))
}

//carga las peliculas y series del .json
loadMoviesAndSeries()

// //obtiene todas las series y peliculas de la bd
// getMovies()

// //obtiene todas las series de la bd
// getMovie('serie')

// const rndInt = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
// console.log(rndInt)

// //inserta un registro con una probabildiad de 50 / 50 de ser pelicula o serie
// postMovie({ title: "Harry Poter " + Math.floor(Math.random() * (100 - 1 + 1)) + 1, year: "2000", type: rndInt === 0 ? "pelicula" : "serie" })