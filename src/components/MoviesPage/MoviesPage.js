import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const location = useLocation();

  const base_url = 'https://api.themoviedb.org/3/search/movie';
  const api_key = '?api_key=a59354717540e035317ae59cf70c16ef';
  const query = `&query=${searchQuery}`;
  const searchUrl = base_url + api_key + query;
  const urlQuery = new URLSearchParams(location.search).get('query');

  const onSubmit = e => {
    e.preventDefault();
    console.log('location', location);
    console.log('history', history);
    console.log(
      'history.location.pathname + history.location.search: ',
      history.location.pathname + history.location.search,
    );
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    if (!searchQuery && !urlQuery) {
      return;
    }

    if (!inputValue && urlQuery) {
      const prevQuery = `&query=${urlQuery}`;
      const searchUrl = base_url + api_key + prevQuery;
      axios
        .get(searchUrl)
        .then(res => setMovies(res.data.results))
        .then(
          history.push({
            ...location,
            search: `query=${urlQuery}`,
          }),
        );
    } else
      axios
        .get(searchUrl)
        .then(res => setMovies(res.data.results))
        .then(
          history.push({
            ...location,
            search: `query=${searchQuery}`,
          }),
        );
  }, [searchQuery]);

  const onChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <form className="SearchForm" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="searh"
          value={inputValue}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit" className="SearchForm-button">
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,

                    state: {
                      from:
                        `${history.location.pathname}` +
                        `${history.location.search}`,
                      label: 'Back to movies from moviePage',
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
