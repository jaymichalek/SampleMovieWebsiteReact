import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

//HOW TO QUERY AN API:
const API_URL = 'http://www.omdbapi.com?apikey=YOUROWNKEY'

const movie1 = {
    "Title": "Superman Returns",
    "Year": "2006",
    "imdbID": "tt0348150",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
}

//const App -- is like the Main() function in C#!!!
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);   //.Search (The name of the first array) to show only data of movies
    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);

    //IMPORTED App.css for styling and search.svg for search box
    //className --> this styles it and corresponds with the imports
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
                ) : 
                (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
                )}
        </div>
    );
}

//Need this code to export components and call it somewhere else!
export default App;