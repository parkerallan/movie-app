import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {
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
    )
      setFavorites(movieFavorites)
      if (movieFavorites) {
        setFavourites(movieFavorites);
      }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-favorites', JSON.stringify(items))
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    )
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='bg row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading 
        heading='MovieFinder' />
        <SearchBox 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
        movies={movies} 
        handleFavoritesClick={addFavoriteMovie} 
        favoriteComponent={AddFavorites} />
      </div>
      <div className='bg row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading
        heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList
        movies={favorites}
        handleFavoritesClick={removeFavoriteMovie}
        favoriteComponent={RemoveFavorites} />
      </div>
    </div>
  );
};

export default App;
