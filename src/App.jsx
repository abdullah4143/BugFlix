import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import hero from './assets/hero.png';
import Search from './components/Search';
import axios from 'axios';
import MovieCard from './components/MovieCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([]);
  const [debounceSearchTerm,setDebounceSearchTerm] = useState('');

  useDebounce( () => setDebounceSearchTerm(searchTerm) , 500 , [searchTerm])


  const API_KEY = import.meta.env.VITE_TMDB_API;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query = '') =>{

    try {

      const API_URL = query ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}` :'https://api.themoviedb.org/3/discover/movie?sort_by_popularity.desc'


      fetch(API_URL, options)
      .then(res => res.json())
      .then(res => {console.log(res.results); setMovies(res.results)})
      .catch(err => setError(err.message));

      
    } catch (error) {
      setError(error)
    }
  }



  useEffect(()=>{
    
   fetchMovies(debounceSearchTerm)
    
  },[debounceSearchTerm])





  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={hero} alt='Hero Image' />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />



      {error && <p className='text-red-600'>{error}</p>}

        <section className='all-movies'>
          {movies.length > 0 ? (
            <ul>
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          ) : (
            <p>No movies found.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
