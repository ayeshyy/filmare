import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import someMovies from "./someMovies";

const API_URL = "https://www.omdbapi.com/?apikey=916312a6";

function App() {
  // using someMovies array so that page dont show no movies found wheneer page reloads cuz initially movies array is empty;
  const [movies, setMovies] = useState(someMovies);
  const [searchTerm, setSearchTerm] = useState("");

  const movieSearch = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    let data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  // useEffect(() => {
  //   movieSearch("movies");
  // }, []);

  return (
    <div className="app">
      <h1>FilMare</h1>
      <div
        className="search"
        onKeyDown={(e) => e.key === "Enter" && movieSearch(searchTerm)}
      >
        <input
          value={searchTerm}
          placeholder="Search for a movie"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => movieSearch(searchTerm)}
        />
      </div>
      {/*? won't give an error if movies array is undefined; */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>no movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
