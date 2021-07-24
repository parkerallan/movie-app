import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=a5d0c1fa`;
    
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect (() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('movie-favorites')
    );
      if (movieFavorites) {
        setFavorites(movieFavorites);
      }
  }, []);

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]

    const favoriteExists = favorites.filter(
      (favorite) => favorite.imdbID === movie.imdbID
    )

    if (favoriteExists.length === 0) {
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-favorites', JSON.stringify(items))
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='bg row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='MovieFinder' />
        <SearchBox 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
        movies={movies} 
        favoriteComponent={AddFavorites}
        handleFavoritesClick={addFavoriteMovie} />
      </div>

      <div className='bg row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites' />
      </div>

      <div className='row'>
        <MovieList
        movies={favorites}
        favoriteComponent={RemoveFavorites}
        handleFavoritesClick={removeFavoriteMovie} />
      </div>
    </div>
  );
};

export default App;
