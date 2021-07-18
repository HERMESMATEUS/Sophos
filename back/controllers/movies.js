const mainRoute = 'movies';

const Movies = require("../models/movies")

const routeMovies = app => {

    // Display all movies and series
    app.get(`/${mainRoute}`, (req, res) => {

        Movies.find({}, (err, response) => {
            if (err) return res.status(500).send({ message: "Error al realizar la consulta" })
            if (!response || response.length < 1) return res.status(404).send({ message: "No existen productos" })
            res.status(200).send({ response })
        })

    });


    // Display a single data by type
    app.get(`/${mainRoute}/:type`, (req, res) => {

        let type = req.params.type
        Movies.find({ type }, (err, response) => {
            if (err) return res.status(500).send({ message: "Error al realizar la consulta" })
            if (!response || response.length < 1) return res.status(404).send({ message: "Producto no encontrado" })
            res.status(200).send({ response })
        })

    });


    // Add a new movie or serie
    app.post(`/${mainRoute}`, (req, res) => {

        let movies = new Movies()
        movies.title = req.body.title;
        movies.year = req.body.year;
        movies.type = req.body.type;
        movies.likes = req.body.likes;

        movies.save((err, response) => {
            if (err) return res.status(500).send({ message: "error al guardar en bd" })
            res.status(200).send({ response })
        })

    });

    // Update a movie or serie
    app.put(`/${mainRoute}/:id`, (req, res) => {

        let id = req.params.id
        let update = req.body;

        Movies.findByIdAndUpdate(id, update, (err, response) => {
            if (err) return res.status(500).send({ message: "Error en la consulta al actualizar el producto" })
            res.status(200).send({ response })
        })

    });


    // Delete a movie or serie
    app.delete(`/${mainRoute}/:id`, (req, res) => {
        let id = req.params.id
        Movies.findByIdAndDelete(id, (err) => {
            if (err) return res.status(500).send({ message: "Error en la consulta" })
            res.status(200).send({ message: "se ha borrando correctamente el registro" })
        })

    });

}

module.exports = routeMovies;