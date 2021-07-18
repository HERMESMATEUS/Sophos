import React from 'react'
import '../styles/App.css';
import { EndPoints } from "../gateway/endpoints"

export default function App() {

  const [moviesAndSeries, setMoviesAndSeries] = React.useState([]);

  const allMoviesSeries = async () => setMoviesAndSeries(await EndPoints.getMovies())

  const getByType = async (type) => setMoviesAndSeries(await EndPoints.getMovie(type))

  const like = async (item, index) => {

    let tempMoviesAndSeries = moviesAndSeries;
    let likes = (item.likes || 0) + 1;
    let response = await EndPoints.putMovie(item._id, { likes })

    if (response != false) {
      tempMoviesAndSeries[index] = { ...item, likes: likes }
      setMoviesAndSeries([...tempMoviesAndSeries])
    }

  }

  React.useEffect(() => {
    allMoviesSeries()
  }, [])

  return (
    <div className="App">

      <div className="options">
        <button onClick={() => getByType('serie')}>Series</button>
        <button onClick={() => getByType('pelicula')}>Peliculas</button>
        <button onClick={() => allMoviesSeries()}>Todas</button>
      </div>

      {moviesAndSeries.map((item, index) => <div className="titles" key={"Titles" + index}>
        <h2>{item.title}</h2>
        <p>Fecha de publicacion: {item.year}</p>
        <p>Categoria: {item.type}</p>
        <p>Likes: {item.likes || 0}</p>
        <button onClick={() => like(item, index)}>Me gusta</button>
      </div>
      )}

    </div>
  );

}