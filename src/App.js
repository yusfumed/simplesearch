import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=30103b44";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMoviesData = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMoviesData("spiderman");
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
    searchMoviesData(search);
  }

  return (
    <div className="app">
      <h1>MovieShow</h1>
      <div className="search">
        <input type="text" value={search} onChange={handleChange} />
        <img src={SearchIcon} alt="search" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>movie not found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
